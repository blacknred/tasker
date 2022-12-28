import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Agent } from 'src/agents/entities/agent.entity';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { Saga } from 'src/sagas/entities/saga.entity';
import {
  BaseRole,
  Privilege,
} from '../../project/src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { NOTIFICATION_SERVICE, WORKER_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-reports.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskUpdate, UpdateRecord } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
    @Inject(WORKER_SERVICE) private readonly workerService: ClientProxy,
    @InjectRepository(Task) private taskRepository: EntityRepository<Task>,
    @InjectRepository(Agent) private agentRepository: EntityRepository<Agent>,
    @InjectRepository(Saga) private sagaRepository: EntityRepository<Saga>,
  ) {}

  async create(createTaskDto: CreateTaskDto, agent: Agent) {
    try {
      const { assigneeId, sagaIds, stage, label, ...rest } = createTaskDto;

      const task = new Task(rest);
      task.wid = agent.workspace._id;
      task.creator = agent;

      if (assigneeId) {
        const assignee = await this.agentRepository.findOne(assigneeId);
        if (!assignee) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'assigneeId',
                message: `Agent not exists`,
              },
            ],
          };
        }

        task.assignee = assignee;
      }

      if (stage) {
        if (!agent.workspace?.stages.includes(stage)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'stage',
                message: `Stage ${stage} not in use`,
              },
            ],
          };
        }

        task.stage = stage;
      }

      if (label) {
        if (!agent.workspace?.labels.includes(label)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'label',
                message: `Label ${label} not in use`,
              },
            ],
          };
        }

        task.label = label;
      }

      if (sagaIds) {
        const sagas = await this.sagaRepository.find({ id: sagaIds });
        task.sagas.add(...sagas);
      }

      await this.taskRepository.flush();

      // worker mock
      if (task.assignee?.role === BaseRole.WORKER) {
        this.workerService.emit('new-task', task);
      }

      return {
        status: HttpStatus.CREATED,
        data: task,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, wid, ...rest }: GetTasksDto, agent: IAgent) {
    const _where = { wid };

    // creator | READ_ANY_TASK
    if (!agent.hasPrivilege(Privilege.READ_ANY_TASK)) {
      _where['creator.id'] = agent.id;
    }

    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Task.isSearchable(key) && rest[key])) return acc;
      acc[key] = rest[key];
      return acc;
    }, _where);

    const [items, total] = await this.taskRepository.findAndCount(where, {
      orderBy: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      limit: +limit + 1,
      offset: +offset,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: items.length === +limit + 1,
        items: items.slice(0, limit),
        // .map((i: any) => {
        //   i.sagas = i.sagas?.toArray();
        //   return i;
        // }),
        total,
      },
    };
  }

  async findOne(id: string, agent: IAgent) {
    const data = await this.taskRepository.findOne(id);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    // creator | READ_ANY_TASK
    if (
      data.creator.id !== agent.id &&
      !agent.hasPrivilege(Privilege.READ_ANY_TASK)
    ) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async update(updateTaskDto: UpdateTaskDto, agent: Agent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, wid, sagaIds, assigneeId, label, ...rest } = updateTaskDto;

      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // creator | EDIT_ANY_TASK
      if (
        res.data.creator.id !== agent.id &&
        !agent.hasPrivilege(Privilege.EDIT_ANY_TASK)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      if (assigneeId) {
        const assignee = await this.agentRepository.findOne(assigneeId);
        if (!assignee) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'assigneeId',
                message: `Agent not exists`,
              },
            ],
          };
        }

        res.data.assignee = assignee;
      }

      if (rest.stage) {
        if (!agent.workspace?.stages.includes(rest.stage)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'stage',
                message: `Stage ${rest.stage} not in use`,
              },
            ],
          };
        }

        res.data.stage = rest.stage;
      }

      if (label) {
        if (!agent.workspace?.labels.includes(label)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'label',
                message: `Label ${label} not in use`,
              },
            ],
          };
        }

        res.data.label = label;
      }

      if (sagaIds) {
        const sagas = await this.sagaRepository.find({ id: sagaIds });
        res.data.sagas.add(...sagas);
      }

      // increment update records
      const records: UpdateRecord[] = Object.keys(rest).reduce((all, field) => {
        const prev = res.data[field];
        const next = rest[field];
        if (!Task.isChangeble(field) || next === prev) return all;
        return all.concat(new UpdateRecord({ prev, next, field }));
      }, []);

      const update = new TaskUpdate({ records, agent });
      res.data.updates.push(update);

      this.taskRepository.assign(res.data, rest);
      await this.taskRepository.flush();

      // worker mock
      if (records.some((record) => record.next === BaseRole.WORKER)) {
        this.workerService.emit('new-task', res.data);
      }

      return {
        status: HttpStatus.OK,
        data: res.data,
      };
    } catch (e) {
      console.log(e);

      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: string, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // creator | DELETE_ANY_TASK
      if (
        res.data.creator.id !== agent.id &&
        !agent.hasPrivilege(Privilege.DELETE_ANY_TASK)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.taskRepository.nativeDelete(id);

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
}
