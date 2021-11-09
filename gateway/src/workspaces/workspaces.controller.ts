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
import { AgentResponseDto } from './dto/agents/agent-response.dto';
import { AgentsResponseDto } from './dto/agents/agents-response.dto';
import { CreateAgentDto } from './dto/agents/create-agent.dto';
import { GetAgentDto } from './dto/agents/get-agent.dto';
import { GetAgentsDto } from './dto/agents/get-agents.dto';
import { UpdateAgentDto } from './dto/agents/update-agent.dto';
import { CreateRoleDto } from './dto/roles/create-role.dto';
import { GetRoleDto } from './dto/roles/get-role.dto';
import { GetRolesDto } from './dto/roles/get-roles.dto';
import { RoleResponseDto } from './dto/roles/role-response.dto';
import { RolesResponseDto } from './dto/roles/roles-response.dto';
import { UpdateRoleDto } from './dto/roles/update-role.dto';
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
    protected readonly workspaceService: ClientProxy,
  ) {}

  // POST

  @Post()
  @WithCreatedApi(WorkspaceResponseDto, 'Create new workspace')
  async create(
    @Auth('user') { id: userId, name: userName },
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService
      .send('create', { ...createWorkspaceDto, userId, userName })
      .toPromise();
  }

  @Post(':id/roles')
  @WithCreatedApi(RoleResponseDto, 'Create new role')
  async createRole(
    @Auth('user') { id: uid },
    @Param() { id: wid }: GetWorkspaceDto,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.workspaceService
      .send('roles/create', { ...createRoleDto, wid, uid })
      .toPromise();
  }

  @Post(':id/agents')
  @WithCreatedApi(AgentResponseDto, 'Create new agent')
  async createAgent(
    @Auth('user') { id: uid },
    @Param() { id: wid }: GetWorkspaceDto,
    @Body() createAgentDto: CreateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.workspaceService
      .send('agents/create', { ...createAgentDto, wid, uid })
      .toPromise();
  }

  @Post(':id/sagas')
  @WithCreatedApi(SagaResponseDto, 'Create new saga')
  async createSaga(
    @Auth('user') { id: uid },
    @Param() { id: wid }: GetWorkspaceDto,
    @Body() createSagaDto: CreateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceService
      .send('sagas/create', { ...createSagaDto, wid, uid })
      .toPromise();
  }

  @Post(':id/tasks')
  @WithCreatedApi(TaskResponseDto, 'Create new task')
  async createTask(
    @Auth('user') { id: uid },
    @Param() { id: wid }: GetWorkspaceDto,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceService
      .send('tasks/create', { ...createTaskDto, wid, uid })
      .toPromise();
  }

  // GET

  @Get()
  @WithOkApi(WorkspacesResponseDto, 'List workspaces')
  async getAll(
    @Auth('user') { id: uid, isAdmin },
    @Query() getWorkspacesDto: GetWorkspacesDto,
  ): Promise<WorkspacesResponseDto> {
    return this.workspaceService
      .send('getAll', { ...getWorkspacesDto, uid: isAdmin ? null : uid })
      .toPromise();
  }

  @Get(':id')
  @WithOkApi(WorkspaceResponseDto, 'Get workspace by id')
  async getOne(
    @Auth('user') { id: uid },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService.send('getOne', { id, uid }).toPromise();
  }

  @Get(':id/roles')
  @WithOkApi(RolesResponseDto, 'List roles')
  async getAllRoles(
    @Auth('user') { id: uid },
    @Query() getRolesDto: GetRolesDto,
    @Param() { id: wid }: GetWorkspaceDto,
  ): Promise<RolesResponseDto> {
    return this.workspaceService
      .send('roles/getAll', { ...getRolesDto, wid, uid })
      .toPromise();
  }

  @Get(':id/roles/:roleId')
  @WithOkApi(RoleResponseDto, 'Get role by id')
  async getOneRole(
    @Auth('user') { id: uid },
    @Param() { id: wid, roleId: id }: GetRoleDto,
  ): Promise<RoleResponseDto> {
    return this.workspaceService
      .send('roles/getOne', { id, wid, uid })
      .toPromise();
  }

  @Get(':id/agents')
  @WithOkApi(AgentsResponseDto, 'List agents')
  async getAllAgents(
    @Auth('user') { id: uid },
    @Query() getAgentsDto: GetAgentsDto,
    @Param() { id: wid }: GetWorkspaceDto,
  ): Promise<AgentsResponseDto> {
    return this.workspaceService
      .send('agents/getAll', { ...getAgentsDto, wid, uid })
      .toPromise();
  }

  @Get(':id/agents/:agentId')
  @WithOkApi(AgentResponseDto, 'Get agent by id')
  async getOneAgent(
    @Auth('user') { id: uid },
    @Param() { id: wid, agentId: id }: GetAgentDto,
  ): Promise<AgentResponseDto> {
    return this.workspaceService
      .send('agents/getOne', { id, wid, uid })
      .toPromise();
  }

  @Get(':id/sagas')
  @WithOkApi(SagasResponseDto, 'List sagas')
  async getAllSagas(
    @Auth('user') { id: uid },
    @Query() getSagasDto: GetSagasDto,
    @Param() { id: wid }: GetWorkspaceDto,
  ): Promise<SagasResponseDto> {
    return this.workspaceService
      .send('sagas/getAll', { ...getSagasDto, wid, uid })
      .toPromise();
  }

  @Get(':id/sagas/:sagaId')
  @WithOkApi(SagaResponseDto, 'Get saga by id')
  async getOneSaga(
    @Auth('user') { id: uid },
    @Param() { id: wid, sagaId: id }: GetSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceService
      .send('sagas/getOne', { id, wid, uid })
      .toPromise();
  }

  @Get(':id/tasks')
  @WithOkApi(TasksResponseDto, 'List tasks')
  async getAllTasks(
    @Auth('user') { id: uid },
    @Query() getTasksDto: GetTasksDto,
    @Param() { id: wid }: GetWorkspaceDto,
  ): Promise<TasksResponseDto> {
    return this.workspaceService
      .send('tasks/getAll', { ...getTasksDto, wid, uid })
      .toPromise();
  }

  @Get(':id/tasks/:taskId')
  @WithOkApi(TaskResponseDto, 'Get task by id')
  async getOneTask(
    @Auth('user') { id: uid },
    @Param() { id: wid, taskId: id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceService
      .send('tasks/getOne', { id, wid, uid })
      .toPromise();
  }

  // PATCH

  @Patch(':id')
  @WithOkApi(WorkspaceResponseDto, 'Update workspace')
  async update(
    @Auth('user') { id: uid },
    @Param() { id }: GetWorkspaceDto,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService
      .send('update', { ...updateWorkspaceDto, id, uid })
      .toPromise();
  }

  @Patch(':id/roles/:roleId')
  @WithOkApi(RoleResponseDto, 'Update role')
  async updateRole(
    @Auth('user') { id: uid },
    @Param() { id: wid, roleId: id }: GetRoleDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.workspaceService
      .send('roles/update', { ...updateRoleDto, id, wid, uid })
      .toPromise();
  }

  @Patch(':id/agents/:agentId')
  @WithOkApi(AgentResponseDto, 'Update agent')
  async updateAgent(
    @Auth('user') { id: uid },
    @Param() { id: wid, agentId: id }: GetAgentDto,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceService
      .send('sagas/update', { ...updateAgentDto, id, wid, uid })
      .toPromise();
  }

  @Patch(':id/sagas/:sagaId')
  @WithOkApi(SagaResponseDto, 'Update saga')
  async updateSaga(
    @Auth('user') { id: uid },
    @Param() { id: wid, sagaId: id }: GetSagaDto,
    @Body() updateSagaDto: UpdateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.workspaceService
      .send('sagas/update', { ...updateSagaDto, id, wid, uid })
      .toPromise();
  }

  @Patch(':id/tasks/:taskId')
  @WithOkApi(TaskResponseDto, 'Update task')
  async updateTask(
    @Auth('user') { id: uid },
    @Param() { id: wid, taskId: id }: GetTaskDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceService
      .send('tasks/update', { ...updateTaskDto, id, wid, uid })
      .toPromise();
  }

  @Patch(':id/tasks/:taskId/restore')
  @WithOkApi(TaskResponseDto, 'Restore task')
  async restoreTask(
    @Auth('user') { id: uid },
    @Param() { id: wid, taskId: id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.workspaceService
      .send('tasks/restore', { id, wid, uid })
      .toPromise();
  }

  // DELETE

  @Delete(':id')
  @WithOkApi(EmptyResponseDto, 'Delete workspace')
  async remove(
    @Auth('user') { id: uid },
    @Param() { id }: GetWorkspaceDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceService.send('delete', { id, uid }).toPromise();
  }

  @Delete(':id/roles/:roleId')
  @WithOkApi(EmptyResponseDto, 'Delete role')
  async deleteRole(
    @Auth('user') { id: uid },
    @Param() { id: wid, roleId: id }: GetRoleDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceService
      .send('roles/delete', { id, wid, uid })
      .toPromise();
  }

  @Delete(':id/agents/:agentId')
  @WithOkApi(EmptyResponseDto, 'Delete agent')
  async deleteAgent(
    @Auth('user') { id: uid },
    @Param() { id: wid, agentId: id }: GetAgentDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceService
      .send('agents/delete', { id, wid, uid })
      .toPromise();
  }

  @Delete(':id/sagas/:sagaId')
  @WithOkApi(EmptyResponseDto, 'Delete saga')
  async deleteSaga(
    @Auth('user') { id: uid },
    @Param() { id: wid, sagaId: id }: GetSagaDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceService
      .send('sagas/delete', { id, wid, uid })
      .toPromise();
  }

  @Delete(':id/tasks/:taskId')
  @WithOkApi(EmptyResponseDto, 'Delete task')
  async deleteTask(
    @Auth('user') { id: uid },
    @Param() { id: wid, taskId: id }: GetTaskDto,
  ): Promise<EmptyResponseDto> {
    return this.workspaceService
      .send('tasks/delete', { id, wid, uid })
      .toPromise();
  }
}
