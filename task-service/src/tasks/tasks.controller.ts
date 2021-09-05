import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RemoveTaskDto } from './dto/remove-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('getTasks')
  findAll({ userId }): Promise<ITaskSearchByUserResponse> {
    return this.tasksService.findTasks({ userId });
  }

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  

  @MessagePattern('findOneTask')
  findOne(@Payload() id: number) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('removeTask')
  remove(@Payload() removeTaskDto : RemoveTaskDto) {
    return this.tasksService.remove(removeTaskDto);
  }
}