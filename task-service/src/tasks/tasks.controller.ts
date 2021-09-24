import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('create')
  create(@Payload() createTaskDto: CreateTaskDto): Promise<ResponseDto<ITask>> {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('getAll')
  getAll(@Payload() getTasksDto: GetTasksDto): Promise<ResponseDto<ITask[]>> {
    return this.tasksService.findAll(getTasksDto);
  }

  @MessagePattern('getOne')
  getOne(@Payload() { id, userId }: GetTaskDto): Promise<ResponseDto<ITask>> {
    return this.tasksService.findOne(id, userId);
  }

  @MessagePattern('update')
  update(@Payload() updateTaskDto: UpdateTaskDto): Promise<ResponseDto<ITask>> {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetTaskDto): Promise<ResponseDto<null>> {
    return this.tasksService.remove(id, userId);
  }
}
