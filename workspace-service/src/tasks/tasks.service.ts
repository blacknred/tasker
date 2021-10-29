import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ObjectID, Repository } from 'typeorm';
import { TASK_REPOSITORY, WORKER_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: Repository<Task>,
    @Inject(WORKER_SERVICE) private readonly workerService: ClientProxy,
  ) {}

  private hasColumn(key: string) {
    return this.taskRepository.metadata.hasColumnWithPropertyPath(key);
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create(createTaskDto);
      const data = await this.taskRepository.save(task);
      data.id = data.id.toString() as unknown as ObjectID;

      this.workerService.emit('new-task', data);

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

  async findAll({ limit, offset, ...rest }: GetTasksDto) {
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(this.hasColumn(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, {}),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: +offset,
      take: +limit + 1,
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

  async findOne(id: ObjectID, userId: number) {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    if (userId != null && task.userId !== userId) {
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

  async update(id: ObjectID, updateTaskDto: UpdateTaskDto) {
    try {
      const res = await this.findOne(id, updateTaskDto.userId);
      if (!res.data) return res as ResponseDto;

      const updatedTask = Object.assign(res.data, updateTaskDto) as Task;
      await this.taskRepository.update(id, updateTaskDto);

      return {
        status: HttpStatus.OK,
        data: updatedTask,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: ObjectID, userId: number) {
    try {
      const res = await this.findOne(id, userId);
      if (!res.data) return res as ResponseDto;

      const deleted = await this.taskRepository.delete(id);

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
}
