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
import { SharedService } from 'src/__shared__/shared.service';
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
    this.tasksService.proxy = client;
  }

  @Post()
  @ApiOperation({ summary: 'Create new task entity' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async create(
    @Auth() { id: userId }: IAuth,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.feed('create', { ...createTaskDto, userId });
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
    return this.tasksService.feed('getAll', payload);
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
    return this.tasksService.feed('findOne', payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update authorized user task entity' })
  @ApiOkResponse({ type: TaskResponseDto })
  async update(
    @Auth() { id: userId }: IAuth,
    @Param() { id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.feed('update', { ...updateTaskDto, id, userId });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete authorized user task entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Auth() { id: userId }: IAuth,
    @Param() { id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.tasksService.feed('delete', { id, userId });
  }
}
