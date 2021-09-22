import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('create')
  create(
    @Payload() createTaskDto: CreateTaskDto,
  ): Promise<ResponseDto<CreateTaskDto>> {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('getAll')
  findAll(
    @Payload() getTasksDto: GetTasksDto,
  ): Promise<ResponseDto<UpdateTaskDto[]>> {
    return this.tasksService.findAll(getTasksDto);
  }

  @MessagePattern('getOne')
  findOne(
    @Payload() { id, userId }: GetTaskDto,
  ): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.findOne(id, userId);
  }

  @MessagePattern('update')
  update(
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetTaskDto): Promise<ResponseDto> {
    return this.tasksService.remove(id, userId);
  }
}
