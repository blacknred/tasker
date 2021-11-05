import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { BaseRole, Privilege } from 'src/roles/interfaces/role.interface';
import { SagasService } from 'src/sagas/sagas.service';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ObjectID, Repository } from 'typeorm';
import {
  NOTIFICATION_SERVICE,
  TASK_REPOSITORY,
  WORKER_SERVICE,
} from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskUpdate, UpdateRecord } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
    @Inject(TASK_REPOSITORY) private taskRepository: Repository<Task>,
    @Inject(WORKER_SERVICE) private readonly workerService: ClientProxy,
    private readonly sagasService: SagasService,
  ) {}

  async create({ sagaIds, ...rest }: CreateTaskDto, agent: IAgent) {
    try {
      const { workspaceId, id: creatorId } = agent;
      const params = { ...rest, workspaceId, creatorId };
      const task = this.taskRepository.create(params);

      if (sagaIds.length) {
        task.sagas = await this.sagasService.findAllByIds(sagaIds);
      }

      const data = await this.taskRepository.save(task);
      data.id = data.id.toString() as unknown as ObjectID;

      // worker mock
      if (data.assignee?.role.name === BaseRole.WORKER) {
        this.workerService.emit('new-task', task);
      }

      return {
        status: HttpStatus.CREATED,
        data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, ...rest }: GetTasksDto, agent: IAgent) {
    const where = { workspaceId: agent.workspaceId };

    if (!agent.role?.privileges.includes(Privilege.READ_ANY_TASK)) {
      where['creator.id'] = agent.id;
    }

    const [tasks, total] = await this.taskRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Task.isSearchable(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, where),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: +offset,
      take: +limit + 1,
      withDeleted: false,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: tasks.length === +limit + 1,
        items: tasks.slice(0, limit),
        total,
      },
    };
  }

  async findOne(id: ObjectID, agent: IAgent, withDeleted?: boolean) {
    const task = await this.taskRepository.findOne(id, { withDeleted });

    if (!task) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    if (
      task.creator.id !== agent.id &&
      !agent.role?.privileges.includes(Privilege.READ_ANY_TASK)
    ) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async update({ id, sagaIds, ...rest }: UpdateTaskDto, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.EDIT_ANY_TASK)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      // increment update records
      const records: UpdateRecord[] = Object.keys(rest).reduce((all, field) => {
        const prev = res.data[field];
        const next = rest[field];
        if (!prev || next === prev) return all;
        return all.concat(new UpdateRecord({ prev, next, field }));
      }, []);

      res.data.updates.push(new TaskUpdate({ agent, records }));

      if (sagaIds.length) {
        res.data.sagas = await this.sagasService.findAllByIds(sagaIds);
      }

      Object.assign(res.data, rest);
      await this.taskRepository.update(id, res.data);

      // worker mock
      if (records.some((record) => record.next === BaseRole.WORKER)) {
        this.workerService.emit('new-task', res.data);
      }

      return {
        status: HttpStatus.OK,
        data: res.data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: ObjectID, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.DELETE_ANY_TASK)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const deleted = await this.taskRepository.softDelete(id);

      if (!deleted.affected) {
        return {
          status: HttpStatus.CONFLICT,
          data: null,
        };
      }

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async restore(id: ObjectID, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent, true);
      if (!res.data) return res as ResponseDto;

      if (res.data.creator.id !== agent.id) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const restored = await this.taskRepository.restore(id);

      if (!restored.affected) {
        return {
          status: HttpStatus.CONFLICT,
          data: null,
        };
      }

      return {
        status: HttpStatus.OK,
        data: res.data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
