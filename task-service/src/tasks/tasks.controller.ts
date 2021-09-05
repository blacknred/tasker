import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('createTask')
  create(
    @Payload() createTaskDto: CreateTaskDto,
  ): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('getAllTasks')
  findAll(
    @Payload params: Partial<CreateTaskDto>,
  ): Promise<ResponseDto<CreateTaskDto[]>> {
    return this.tasksService.findAll(params);
  }

  @MessagePattern('getOneTask')
  findOne(@Payload() id: string): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<UpdateTaskDto>> {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('removeTask')
  remove(
    @Payload() id: string,
    @Payload() userId: number,
  ): Promise<ResponseDto> {
    return this.tasksService.remove(id, userId);
  }
}
