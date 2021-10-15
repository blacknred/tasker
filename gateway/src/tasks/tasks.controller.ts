import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthedGuard } from 'src/auth/guards/authed.guard';
import { IAuth } from 'src/auth/interfaces/auth.interface';
import { Role } from 'src/users/interfaces/user.interface';
import { EmptyResponseDto } from 'src/__shared__/dto/empty-response.dto';
import { FeedInterceptor } from 'src/__shared__/interceptors/feed.interceptors';
import { TASK_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
@UseInterceptors(FeedInterceptor)
@UseGuards(AuthedGuard)
export class TasksController {
  constructor(
    @Inject(TASK_SERVICE) protected readonly taskService: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new task entity' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async create(
    @Auth() { id: userId }: IAuth,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService
      .send('create', { ...createTaskDto, userId })
      .toPromise();
  }

  @Get()
  @ApiOperation({ summary: 'List tasks' })
  @ApiOkResponse({ type: TasksResponseDto })
  async getAll(
    @Auth() { id: userId, roles }: IAuth,
    @Query() params: GetTasksDto,
  ): Promise<TasksResponseDto> {
    const payload = { ...params, userId };
    if (roles.includes(Role.ADMIN)) delete payload.userId;
    return this.taskService.send('getAll', payload).toPromise();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({ type: TaskResponseDto })
  async getOne(
    @Auth() { id: userId, roles }: IAuth,
    @Param() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    const payload = { id, userId };
    if (roles.includes(Role.ADMIN)) delete payload.userId;
    return this.taskService.send('findOne', payload).toPromise();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update authorized user task entity' })
  @ApiOkResponse({ type: TaskResponseDto })
  async update(
    @Auth() { id: userId }: IAuth,
    @Param() { id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService
      .send('update', { ...updateTaskDto, id, userId })
      .toPromise();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete authorized user task entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Auth() { id: userId }: IAuth,
    @Param() { id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.taskService.send('delete', { id, userId }).toPromise();
  }
}
