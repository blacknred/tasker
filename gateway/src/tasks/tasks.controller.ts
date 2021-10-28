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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/__shared__/decorators/auth.decorator';
import { AuthedGuard } from 'src/__shared__/guards/authed.guard';
import { UserRole } from 'src/users/interfaces/user.interface';
import { EmptyResponseDto } from 'src/__shared__/dto/response.dto';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ProxyInterceptor } from 'src/__shared__/interceptors/proxy.interceptor';
import { TASK_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@ApiCookieAuth()
@Controller('tasks')
@UseFilters(AllExceptionFilter)
@UseInterceptors(ProxyInterceptor)
@UseGuards(AuthedGuard)
export class TasksController {
  constructor(
    @Inject(TASK_SERVICE) protected readonly taskService: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new task entity' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async create(
    @Auth('user') { id: userId },
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
    @Auth('user') { id: userId, roles },
    @Query() getTasksDto: GetTasksDto,
  ): Promise<TasksResponseDto> {
    const payload = { ...getTasksDto, userId };
    if (roles.includes(UserRole.ADMIN)) delete payload.userId;
    return this.taskService.send('getAll', payload).toPromise();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({ type: TaskResponseDto })
  async getOne(
    @Auth('user') { id: userId, roles },
    @Param() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    const payload = { id, userId };
    if (roles.includes(UserRole.ADMIN)) delete payload.userId;
    return this.taskService.send('getOne', payload).toPromise();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update authorized user task entity' })
  @ApiOkResponse({ type: TaskResponseDto })
  async update(
    @Auth('user') { id: userId },
    @Param() { id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService
      .send('patch', { ...updateTaskDto, id, userId })
      .toPromise();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete authorized user task entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Auth('user') { id: userId },
    @Param() { id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.taskService.send('delete', { id, userId }).toPromise();
  }
}
