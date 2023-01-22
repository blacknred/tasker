import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Auth,
  IdResponseDto,
  Permission,
  ProjectPermission,
  Session,
} from '@taskapp/shared';
import {
  ArchiveProjectCommand,
  CreateProjectCommand,
  UnArchiveProjectCommand,
  UpdateProjectCommand,
} from './commands';
import { CreateProjectDto, DeleteProjectDto, UpdateProjectDto } from './dto';

@Auth()
@ApiTags('Projects')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class ProjectsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ description: 'Сreate project' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async create(
    @Session('userId') userId,
    @Body() dto: CreateProjectDto,
  ): Promise<IdResponseDto> {
    const { id: data } = await this.commandBus.execute(
      new CreateProjectCommand(dto, userId),
    );
    return { data };
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update project' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(ProjectPermission.PROJECT_MANAGEMENT)
  async update(
    @Param() { id }: DeleteProjectDto,
    @Body() dto: UpdateProjectDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateProjectCommand(id, dto));
    return { data: id };
  }

  @Patch(':id/archive')
  @ApiOperation({ description: 'Archive project' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(ProjectPermission.PROJECT_MANAGEMENT)
  async archive(@Param() { id }: DeleteProjectDto): Promise<IdResponseDto> {
    await this.commandBus.execute(new ArchiveProjectCommand(id));
    return { data: id };
  }

  @Patch(':id/unarchive')
  @ApiOperation({ description: 'Unarchive project' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(ProjectPermission.PROJECT_MANAGEMENT)
  async unarchive(@Param() { id }: DeleteProjectDto): Promise<IdResponseDto> {
    await this.commandBus.execute(new UnArchiveProjectCommand(id));
    return { data: id };
  }
}
