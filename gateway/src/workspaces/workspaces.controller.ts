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
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/__shared__/decorators/auth.decorator';
import {
  WithCreatedApi,
  WithOkApi,
} from 'src/__shared__/decorators/with-api.decorator';
import { WithAuth } from 'src/__shared__/decorators/with-auth.decorator';
import { EmptyResponseDto } from 'src/__shared__/dto/response.dto';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ProxyInterceptor } from 'src/__shared__/interceptors/proxy.interceptor';
import { WORKSPACE_SERVICE } from './consts';
import { CreateSagaDto } from './dto/sagas/create-saga.dto';
import { GetSagaDto } from './dto/sagas/get-saga.dto';
import { GetSagasDto } from './dto/sagas/get-sagas.dto';
import { SagaResponseDto } from './dto/sagas/saga-response.dto';
import { SagasResponseDto } from './dto/sagas/sagas-response.dto';
import { UpdateSagaDto } from './dto/sagas/update-saga.dto';
import { CreateTaskDto } from './dto/tasks/create-task.dto';
import { GetTaskDto } from './dto/tasks/get-task.dto';
import { GetTasksDto } from './dto/tasks/get-tasks.dto';
import { TaskResponseDto } from './dto/tasks/task-response.dto';
import { TasksResponseDto } from './dto/tasks/tasks-response.dto';
import { UpdateTaskDto } from './dto/tasks/update-task.dto';
import { CreateWorkspaceDto } from './dto/workspaces/create-workspace.dto';
import { GetWorkspaceDto } from './dto/workspaces/get-workspace.dto';
import { GetWorkspacesDto } from './dto/workspaces/get-workspaces.dto';
import { UpdateWorkspaceDto } from './dto/workspaces/update-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspaces/workspace-response.dto';
import { WorkspacesResponseDto } from './dto/workspaces/workspaces-response.dto';

@WithAuth()
@ApiTags('Workspaces')
@Controller('workspaces')
@UseFilters(AllExceptionFilter)
@UseInterceptors(ProxyInterceptor)
export class WorkspacesController {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    protected readonly workspaceRepository: ClientProxy,
  ) {}

  // POST

  @Post()
  @WithCreatedApi(WorkspaceResponseDto, 'Create new workspace')
  async create(
    @Auth('user') { id: userId, name: userName },
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository
      .send('create', { ...createWorkspaceDto, userId, userName })
      .toPromise();
  }

  @Post(':id/sagas')
  @WithCreatedApi(SagaResponseDto, 'Create new saga')
  async createSaga(
    @Param('id') workspaceId,
    @Auth('user') { id: userId },
    @Body() createSagaDto: CreateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceRepository
      .send('sagas/create', { ...createSagaDto, workspaceId, userId })
      .toPromise();
  }

  @Post(':id/tasks')
  @WithCreatedApi(TaskResponseDto, 'Create new task')
  async createTask(
    @Param('id') workspaceId,
    @Auth('user') { id: userId },
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceRepository
      .send('tasks/create', { ...createTaskDto, workspaceId, userId })
      .toPromise();
  }

  // GET

  @Get()
  @WithOkApi(WorkspacesResponseDto, 'List workspaces')
  async getAll(
    @Auth('user') { id: userId, isAdmin },
    @Query() getWorkspacesDto: GetWorkspacesDto,
  ): Promise<WorkspacesResponseDto> {
    return this.workspaceRepository
      .send('getAll', { ...getWorkspacesDto, userId: isAdmin ? null : userId })
      .toPromise();
  }

  @Get(':id')
  @WithOkApi(WorkspaceResponseDto, 'Get workspace by id')
  async getOne(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository.send('getOne', { id, userId }).toPromise();
  }

  @Get(':id/sagas')
  @WithOkApi(SagasResponseDto, 'List sagas')
  async getAllSagas(
    @Auth('user') { id: userId },
    @Query() getSagasDto: GetSagasDto,
    @Param() { id: workspaceId }: GetWorkspaceDto,
  ): Promise<SagasResponseDto> {
    return this.workspaceRepository
      .send('sagas/getAll', { ...getSagasDto, workspaceId, userId })
      .toPromise();
  }

  @Get(':id/sagas/:sagaId')
  @WithOkApi(SagaResponseDto, 'Get saga by id')
  async getOneSaga(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, sagaId: id }: GetSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceRepository
      .send('sagas/getOne', { id, workspaceId, userId })
      .toPromise();
  }

  @Get(':id/tasks')
  @WithOkApi(TasksResponseDto, 'List tasks')
  async getAllTasks(
    @Auth('user') { id: userId },
    @Query() getTasksDto: GetTasksDto,
    @Param() { id: workspaceId }: GetWorkspaceDto,
  ): Promise<TasksResponseDto> {
    return this.workspaceRepository
      .send('tasks/getAll', { ...getTasksDto, workspaceId, userId })
      .toPromise();
  }

  @Get(':id/tasks/:taskId')
  @WithOkApi(TaskResponseDto, 'Get task by id')
  async getOneTask(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, taskId: id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceRepository
      .send('tasks/getOne', { id, workspaceId, userId })
      .toPromise();
  }

  // PATCH

  @Patch(':id')
  @WithOkApi(WorkspaceResponseDto, 'Update workspace')
  async update(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceRepository
      .send('update', { ...updateWorkspaceDto, id, userId })
      .toPromise();
  }

  @Patch(':id/sagas/:sagaId')
  @WithOkApi(SagaResponseDto, 'Update saga')
  async updateSaga(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, sagaId: id }: GetSagaDto,
    @Body() updateSagaDto: UpdateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceRepository
      .send('sagas/update', { ...updateSagaDto, id, workspaceId, userId })
      .toPromise();
  }

  @Patch(':id/tasks/:taskId')
  @WithOkApi(TaskResponseDto, 'Update task')
  async updateTask(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, taskId: id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceRepository
      .send('tasks/update', { ...updateTaskDto, id, workspaceId, userId })
      .toPromise();
  }

  // DELETE

  @Delete(':id')
  @WithOkApi(EmptyResponseDto, 'Delete workspace')
  async remove(
    @Auth('user') { id: userId },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceRepository.send('delete', { id, userId }).toPromise();
  }

  @Delete(':id/sagas/:sagaId')
  @WithOkApi(EmptyResponseDto, 'Delete saga')
  async deleteSaga(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, sagaId: id }: GetSagaDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceRepository
      .send('sagas/delete', { id, workspaceId, userId })
      .toPromise();
  }

  @Delete(':id/tasks/:taskId')
  @WithOkApi(EmptyResponseDto, 'Delete task')
  async deleteTask(
    @Auth('user') { id: userId },
    @Param() { id: workspaceId, taskId: id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceRepository
      .send('tasks/delete', { id, workspaceId, userId })
      .toPromise();
  }
}
