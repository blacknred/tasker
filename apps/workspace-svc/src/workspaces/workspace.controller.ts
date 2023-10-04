import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Auth,
  IdResponseDto,
  Permission,
  WorkspacePolicy,
} from '@taskapp/shared';
import {
  CreateProjectDto,
  CreateRoleDto,
  CreateUserDto,
  CreateWorkspaceDto,
  DeleteProjectDto,
  DeleteRoleDto,
  DeleteUserDto,
  GetProjectDto,
  GetRoleDto,
  GetRolesDto,
  GetUserDto,
  GetUsersDto,
  GetWorkspaceDto,
  ProjectResponseDto,
  ProjectsResponseDto,
  RoleResponseDto,
  RolesResponseDto,
  UpdateProjectDto,
  UpdateRoleDto,
  UpdateUserDto,
  UserResponseDto,
  UsersResponseDto,
  WorkspaceResponseDto,
} from './dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspaceService } from './workspace.service';

@ApiTags('Workspace')
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ description: 'Сreate wokspace' })
  @ApiCreatedResponse({ type: WorkspaceResponseDto })
  async create(@Body() dto: CreateWorkspaceDto): Promise<WorkspaceResponseDto> {
    return this.workspaceService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get workspace by id' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  async getOne(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService.findAll(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update workspace' })
  @ApiOkResponse({ type: WorkspaceResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async update(
    @Auth('userId') userId,
    @Body() dto: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspaceService.update(dto, userId);
  }

  // roles

  @Post(':id/roles')
  @ApiOperation({ description: 'Сreate workspace role' })
  @ApiCreatedResponse({ type: RoleResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async createRole(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Body() dto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.workspaceService.createRole(id, dto, userId);
  }

  @Get(':id/roles')
  @ApiOperation({ description: 'List all workspace roles' })
  @ApiOkResponse({ type: RolesResponseDto })
  async getAllRoles(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Query() dto: GetRolesDto,
  ): Promise<RolesResponseDto> {
    return this.workspaceService.findAllRoles(id, dto, userId);
  }

  @Get(':id/roles/:rid')
  @ApiOperation({ description: 'Get workspace role by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOneRole(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { rid }: GetRoleDto,
  ): Promise<UserResponseDto> {
    return this.workspaceService.findOneRole(id, rid, userId);
  }

  @Patch(':id/roles/:rid')
  @ApiOperation({ description: 'Update workspace role' })
  @ApiOkResponse({ type: RoleResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async updateRole(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { rid }: GetRoleDto,
    @Body() dto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.workspaceService.updateRole(id, rid, dto, userId);
  }

  @Delete(':id/roles/:rid')
  @ApiOperation({ description: 'Delete workspace role' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async deleteRole(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { rid }: DeleteRoleDto,
  ): Promise<IdResponseDto> {
    return this.workspaceService.deleteRole(id, rid, userId);
  }

  // users

  @Post(':id/users')
  @ApiOperation({ description: 'Сreate workspace user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async createUser(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Body() dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.workspaceService.createUser(id, dto, userId);
  }

  @Get(':id/users')
  @ApiOperation({ description: 'List all workspace users' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Query() dto: GetUsersDto,
  ): Promise<UsersResponseDto> {
    return this.workspaceService.findAllUsers(id, dto, userId);
  }

  @Get(':id/users/:uid')
  @ApiOperation({ description: 'Get workspace user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOneUser(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { uid }: GetUserDto,
  ): Promise<UserResponseDto> {
    return this.workspaceService.findOneUser(id, uid, userId);
  }

  @Patch(':id/users/:uid')
  @ApiOperation({ description: 'Update workspace user' })
  @ApiOkResponse({ type: UserResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async updateUser(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { uid }: GetUserDto,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.workspaceService.updateUser(id, uid, dto, userId);
  }

  @Delete(':id/users/:uid')
  @ApiOperation({ description: 'Delete workspace user' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async deleteUser(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { uid }: DeleteUserDto,
  ): Promise<IdResponseDto> {
    return this.workspaceService.deleteUser(id, uid, userId);
  }

  // projects

  @Post(':id/projects')
  @ApiOperation({ description: 'Сreate workspace project' })
  @ApiCreatedResponse({ type: ProjectResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async createProject(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Body() dto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.workspaceService.createProject(id, dto, userId);
  }

  @Get(':id/projects')
  @ApiOperation({ description: 'List all workspace projects' })
  @ApiOkResponse({ type: ProjectsResponseDto })
  async getAllProjects(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Query() dto: GetProjectDto,
  ): Promise<ProjectsResponseDto> {
    return this.workspaceService.findAllProjects(id, dto, userId);
  }

  @Get(':id/projects/:pid')
  @ApiOperation({ description: 'Get workspace project by id' })
  @ApiOkResponse({ type: ProjectResponseDto })
  async getOneProject(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { pid }: GetProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.workspaceService.findOneProject(id, pid, userId);
  }

  @Patch(':id/projects/:pid')
  @ApiOperation({ description: 'Update workspace project' })
  @ApiOkResponse({ type: ProjectResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async updateProject(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { pid }: GetProjectDto,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.workspaceService.updateProject(id, pid, dto, userId);
  }

  @Delete(':id/projects/:pid')
  @ApiOperation({ description: 'Delete workspace project' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.WORKSPACE_MANAGEMENT)
  async deleteProject(
    @Auth('userId') userId,
    @Param() { id }: GetWorkspaceDto,
    @Param() { pid }: DeleteProjectDto,
  ): Promise<IdResponseDto> {
    return this.workspaceService.deleteProject(id, pid, userId);
  }
}
