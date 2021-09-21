import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseDto } from './dto/response.dto';
import { GetTasksDto } from './dto/get-tasks.dto';

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
    @Payload() params: GetTasksDto,
  ): Promise<ResponseDto<UpdateTaskDto[]>> {
    return this.tasksService.findAll(params);
  }

  @MessagePattern('getOne')
  findOne(@Payload() id: string): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('update')
  update(
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('delete')
  remove(
    @Payload() id: string,
    @Payload() userId: number,
  ): Promise<ResponseDto> {
    return this.tasksService.remove(id, userId);
  }
}
