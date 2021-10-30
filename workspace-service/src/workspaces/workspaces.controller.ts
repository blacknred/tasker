import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspaceDto } from './dto/get-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import {
  ResponseDto,
  WorkspaceResponseDto,
  WorkspacesResponseDto,
} from './dto/response.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspace')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @MessagePattern('create')
  async create(
    @Payload() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @MessagePattern('getAll')
  getAll(
    @Payload() getWorkspacesDto: GetWorkspacesDto,
  ): Promise<WorkspacesResponseDto> {
    return this.workspacesService.findAll(getWorkspacesDto);
  }

  @MessagePattern('getOne')
  getOne(
    @Payload() { id, userId }: GetWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.findOne(id, userId);
  }

  @MessagePattern('patch')
  update(
    @Payload() { id, ...rest }: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    return this.workspacesService.update(id, rest);
  }

  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetWorkspaceDto): Promise<ResponseDto> {
    return this.workspacesService.remove(id, userId);
  }
}
