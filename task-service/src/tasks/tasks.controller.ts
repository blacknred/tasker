import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RemoveTaskDto } from './dto/remove-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('findAllTasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern('findOneTask')
  findOne(@Payload() id: number) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    throw new RpcException('Invalid credentials.');
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('removeTask')
  remove(@Payload() removeTaskDto : RemoveTaskDto) {
    let result: ITaskDeleteResponse;

    if (params && params.userId && params.id) {
      try {
        const task = await this.taskService.findTaskById(params.id);

        if (task) {
          if (task.user_id === params.userId) {
            await this.taskService.removeTaskById(params.id);
            result = {
              status: HttpStatus.OK,
              message: 'task_delete_by_id_success',
              errors: null,
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'task_delete_by_id_forbidden',
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'task_delete_by_id_not_found',
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'task_delete_by_id_forbidden',
          errors: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'task_delete_by_id_bad_request',
        errors: null,
      };
    }

    return result;



    
    return this.tasksService.remove(id);
  }
}
params: {
  userId: string;
  id: string;
}): Promise<ITaskDeleteResponse> 