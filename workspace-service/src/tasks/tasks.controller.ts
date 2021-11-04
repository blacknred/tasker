import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/roles/role.interface';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import {
  ResponseDto,
  TaskResponseDto,
  TasksResponseDto,
} from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AgentGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @WithPrivilege(Privilege.CREATE_TASK)
  @MessagePattern('create')
  create(@Payload() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('getAll')
  getAll(@Payload() getTasksDto: GetTasksDto): Promise<TasksResponseDto> {
    return this.tasksService.findAll(getTasksDto);
  }

  @MessagePattern('getOne')
  getOne(@Payload() { id, userId }: GetTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, userId);
  }

  @MessagePattern('update')
  update(@Payload() updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetTaskDto): Promise<ResponseDto> {
    return this.tasksService.remove(id, userId);
  }
}
