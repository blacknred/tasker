import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ObjectID, Repository } from 'typeorm';
import { QUEUE_SERVICE, TASK_REPOSITORY } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: Repository<Task>,
    @Inject(QUEUE_SERVICE) private readonly queueService: ClientProxy,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskRepository.insert(createTaskDto);
      this.queueService.emit<any>('task', task);

      return {
        status: HttpStatus.CREATED,
        data: task.raw,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }

  async findAll(getTasksDto: GetTasksDto) {
    const tasks = await this.taskRepository.find(getTasksDto);

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  async findOne(id: ObjectID, userId: number) {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }

    if (userId != null && task.userId !== userId) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
        data: null,
      });
    }

    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async update(id: ObjectID, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOne(id);

      if (!task) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      if (task.userId !== updateTaskDto.userId) {
        throw new RpcException({
          status: HttpStatus.FORBIDDEN,
          data: null,
        });
      }

      const updatedTask = Object.assign(task, updateTaskDto) as Task;
      await this.taskRepository.save(updatedTask);

      return {
        status: HttpStatus.OK,
        data: updatedTask,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }

  async remove(id: ObjectID, userId: number) {
    try {
      const task = await this.taskRepository.findOne(id);

      if (!task) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      if (task.userId !== userId) {
        throw new RpcException({
          status: HttpStatus.FORBIDDEN,
          data: null,
        });
      }

      await this.taskRepository.delete(id);

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }
}
