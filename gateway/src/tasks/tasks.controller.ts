import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { EmptyResponseDto } from './dto/empty-response.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IAuthRequest } from './interfaces/auth-request.interface';
import { TasksService } from './tasks.service';

@Controller('v1/tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(LoggedInGuard)
  @Post()
  @ApiCreatedResponse({
    type: TaskResponseDto,
  })
  async create(
    @Req() { user }: IAuthRequest,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(user.id, createTaskDto);
  }

  @UseGuards(LoggedInGuard)
  @Get()
  @ApiOkResponse({
    type: TasksResponseDto,
  })
  async getAll(
    @Req() { user }: IAuthRequest,
    @Param() params: GetTasksDto,
  ): Promise<TasksResponseDto> {
    return this.tasksService.findAll(params, user.id);
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  @ApiOkResponse({
    type: TaskResponseDto,
  })
  async getOne(
    @Req() { user }: IAuthRequest,
    @Param() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, user.id);
  }

  @UseGuards(LoggedInGuard)
  @Patch(':id')
  @ApiOkResponse({
    type: TaskResponseDto,
  })
  async update(
    @Req() { user }: IAuthRequest,
    @Param() { id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, user.id, updateTaskDto);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResponseDto,
  })
  async remove(
    @Req() { user }: IAuthRequest,
    @Param() { id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.tasksService.remove(id, user.id);
  }
}
