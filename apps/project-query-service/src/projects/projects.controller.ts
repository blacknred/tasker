import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, Auth, Session } from '@taskapp/shared';
import {
  GetProjectDto,
  GetProjectsDto,
  ProjectResponseDto,
  ProjectsResponseDto,
} from './dto';
import { GetProjectQuery, GetProjectsQuery } from './queries';

@Auth()
@ApiTags('Projects')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class ProjectsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all projects' })
  @ApiOkResponse({ type: ProjectsResponseDto })
  async getAll(
    @Session('projects') allowedProjects,
    @Query() dto: GetProjectsDto,
  ): Promise<ProjectsResponseDto> {
    return this.queryBus.execute(new GetProjectsQuery(dto, allowedProjects));
  }

  @Get(':id')
  @ApiOperation({ description: 'Get project by id' })
  @ApiOkResponse({ type: ProjectResponseDto })
  async getOne(
    @Session('projects') allowedProjects,
    @Param() { id }: GetProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.queryBus.execute(new GetProjectQuery(id, allowedProjects));
  }
}
