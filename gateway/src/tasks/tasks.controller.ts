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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthedGuard } from 'src/auth/guards/authed.guard';
import { IAuthedRequest } from 'src/auth/interfaces/authed-request.interface';
import { EmptyResponseDto } from 'src/__shared__/dto/empty-response.dto';
import { SharedService } from 'src/__shared__/shared.service';
import { Role } from 'src/users/interfaces/user.interface';
import { TASK_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
@UseGuards(AuthedGuard)
export class TasksController {
  constructor(
    private readonly tasksService: SharedService,
    @Inject(TASK_SERVICE) protected readonly client: ClientProxy,
  ) {
    this.tasksService.client = client;
  }

  @Post()
  @ApiOperation({ summary: 'Create new task entity' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async create(
    @Req() { user: { id: userId } }: IAuthedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.feed('create', { ...createTaskDto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'List tasks' })
  @ApiOkResponse({ type: TasksResponseDto })
  async getAll(
    @Req() { user: { id: userId, roles } }: IAuthedRequest,
    @Query() params: GetTasksDto,
  ): Promise<TasksResponseDto> {
    const payload = { ...params, userId };
    if (roles.includes(Role.ADMIN)) delete payload.userId;
    return this.tasksService.feed('getAll', payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({ type: TaskResponseDto })
  async getOne(
    @Req() { user: { id: userId, roles } }: IAuthedRequest,
    @Param() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    const payload = { id, userId };
    if (roles.includes(Role.ADMIN)) delete payload.userId;
    return this.tasksService.feed('findOne', payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update authorized user task entity' })
  @ApiOkResponse({ type: TaskResponseDto })
  async update(
    @Req() { user: { id: userId } }: IAuthedRequest,
    @Param() { id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.feed('update', { ...updateTaskDto, id, userId });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete authorized user task entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Req() { user: { id: userId } }: IAuthedRequest,
    @Param() { id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.tasksService.feed('delete', { id, userId });
  }
}
