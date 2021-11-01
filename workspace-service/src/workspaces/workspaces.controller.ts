import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AgentGuard } from 'src/__shared__/guards/access.guard';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspaceDto } from './dto/get-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import {
  WorkspaceResponseDto,
  WorkspacesResponseDto,
} from './dto/response.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller()
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @MessagePattern('create')
  async create(
    @Payload() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.create(createWorkspaceDto);
  }

  // Access
  @MessagePattern('getAll')
  async getAll(
    @Payload() getWorkspacesDto: GetWorkspacesDto,
  ): Promise<WorkspacesResponseDto> {
    return this.workspacesService.findAll(getWorkspacesDto);
  }

  // Access
  @MessagePattern('getOne')
  async getOne(
    @Payload() { id, userId }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.findOne(id, userId);
  }

  // Access, EDIT_WORKSPACE
  @MessagePattern('update')
  async update(
    @Payload() { id, ...rest }: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.update(id, rest);
  }

  @MessagePattern('delete')
  async remove(
    @Payload() { id, userId }: GetWorkspaceDto,
  ): Promise<ResponseDto> {
    return this.workspacesService.remove(id, userId);
  }
}
