import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto, CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetTaskDto } from './dto/get-workspace.dto';
import { GetTasksDto } from './dto/get-workspaces.dto';
import {
  ResponseDto,
  TaskResponseDto,
  TasksResponseDto,
  WorkspaceResponseDto,
} from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-workspace.dto';
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

  // @MessagePattern('getAll')
  // getAll(@Payload() getTasksDto: GetTasksDto): Promise<TasksResponseDto> {
  //   return this.workspacesService.findAll(getTasksDto);
  // }

  // @MessagePattern('getOne')
  // getOne(@Payload() { id, userId }: GetTaskDto): Promise<TaskResponseDto> {
  //   return this.workspacesService.findOne(id, userId);
  // }

  // @MessagePattern('patch')
  // update(@Payload() updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
  //   return this.workspacesService.update(updateTaskDto.id, updateTaskDto);
  // }

  // @MessagePattern('delete')
  // remove(@Payload() { id, userId }: GetTaskDto): Promise<ResponseDto> {
  //   return this.workspacesService.remove(id, userId);
  // }
}
