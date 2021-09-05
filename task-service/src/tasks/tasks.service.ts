import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { taskRepository } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(taskRepository)
    private taskRepository: Repository<Task>,
  ) {}
  
  create(createTaskDto: CreateTaskDto) {
    throw new RpcException('Invalid credentials.');
    return 'This action adds a new task';
  }

  async findTasks(params) {
    let result: ITaskSearchByUserResponse;

    if (params) {
      const tasks = await this.taskService.getTasksByUserId(userId);
      return this.taskRepository.find(params).exec();
      result = {
        status: HttpStatus.OK,
        message: 'task_search_by_user_id_success',
        tasks,
      };
    } else {
      throw new RpcException('Invalid credentials.');
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_search_by_user_id_bad_request',
        tasks: null,
      };
    }

    return result;
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
