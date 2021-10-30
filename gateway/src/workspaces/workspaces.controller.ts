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
import { AuthGuard } from 'src/__shared__/guards/auth.guard';
import { EmptyResponseDto } from 'src/__shared__/dto/response.dto';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ProxyInterceptor } from 'src/__shared__/interceptors/proxy.interceptor';
import { WORKSPACE_SERVICE } from './consts';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksResponseDto } from './dto/tasks-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Workspaces')
@ApiCookieAuth()
@Controller('workspaces')
@UseFilters(AllExceptionFilter)
@UseInterceptors(ProxyInterceptor)
@UseGuards(AuthGuard)
export class WorkspacesController {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    protected readonly workspaceRepository: ClientProxy,
  ) {}

  // POST

  @Post()
  @ApiOperation({ summary: 'Create new workspace' })
  @ApiCreatedResponse({ type: WorkspaceResponseDto })
  async create(
    @Auth('user') { id: userId },
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository
      .send('create', { ...createWorkspaceDto, userId })
      .toPromise();
  }

  @Post(':id/agents')
  @ApiOperation({ summary: 'Create new workspace agent' })
  @ApiCreatedResponse({ type: AgentResponseDto })
  async createAgent(
    @Auth('user') { id: userId },
    @Body() createAgentDto: CreateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.workspaceRepository
      .send('createAgent', { ...createAgentDto, userId })
      .toPromise();
  }

  @Post(':id/sagas')
  @ApiOperation({ summary: 'Create new workspace saga' })
  @ApiCreatedResponse({ type: SagaResponseDto })
  async createSaga(
    @Auth('user') { id: userId },
    @Body() createSagaDto: CreateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceRepository
      .send('createSaga', { ...createSagaDto, userId })
      .toPromise();
  }

  @Post(':id/tasks')
  @ApiOperation({ summary: 'Create new workspace task' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async createTask(
    @Auth('user') { id: userId },
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceRepository
      .send('createTask', { ...createTaskDto, userId })
      .toPromise();
  }

  // GET

  @Get()
  @ApiOperation({ summary: 'List workspaces' })
  @ApiOkResponse({ type: WorkspacesResponseDto })
  async getAll(
    @Auth('user') { id: userId },
    @Query() getWorkspacesDto: GetWorkspacesDto,
  ): Promise<WorkspacesResponseDto> {
    return this.workspaceRepository
      .send('getAll', { ...getWorkspacesDto, userId })
      .toPromise();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workspace by id' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  async getOne(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository.send('getOne', { id, userId }).toPromise();
  }

  // PATCH

  @Patch(':id')
  @ApiOperation({ summary: 'Update workspace' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  async update(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository
      .send('patch', { ...updateWorkspaceDto, id, userId })
      .toPromise();
  }

  // DELETE

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workspace' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceRepository.send('delete', { id, userId }).toPromise();
  }
}
