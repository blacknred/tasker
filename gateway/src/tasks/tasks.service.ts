import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { taskService } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IResponse } from './interfaces/response.interface';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@Inject(taskService) private readonly taskService: ClientProxy) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const { data, errors, status }: IResponse<ITask> = await firstValueFrom(
      this.taskService.send('create', {
        ...createTaskDto,
        userId,
      }),
    );

    if (status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          data: null,
          errors,
        },
        status,
      );
    }

    return {
      data,
      errors: null,
    };
  }

  async findAll(params: GetTasksDto, userId: number) {
    const { data, errors, status }: IResponse<ITask[]> = await firstValueFrom(
      this.taskService.send('getAll', { userId, ...params }),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          errors,
          data: null,
        },
        status,
      );
    }

    return {
      data,
      errors: null,
    };
  }

  async findOne(id: string, userId: number) {
    const { data, errors, status }: IResponse<ITask> = await firstValueFrom(
      this.taskService.send('getOne', {
        userId,
        id,
      }),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          errors,
          data: null,
        },
        status,
      );
    }

    return {
      data,
      errors: null,
    };
  }

  async update(id: string, userId: number, updateTaskDto: UpdateTaskDto) {
    const { data, errors, status }: IResponse<ITask> = await firstValueFrom(
      this.taskService.send('update', {
        ...updateTaskDto,
        userId,
        id,
      }),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          errors,
          data: null,
        },
        status,
      );
    }

    return {
      data,
      errors: null,
    };
  }

  async remove(id: string, userId: number) {
    const { errors, status }: IResponse = await firstValueFrom(
      this.taskService.send('delete', {
        userId,
        id,
      }),
    );

    if (status == HttpStatus.OK) {
      throw new HttpException(
        {
          errors,
          data: null,
        },
        status,
      );
    }

    return {
      data: null,
      errors: null,
    };
  }
}
