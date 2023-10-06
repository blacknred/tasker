import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Authentication,
  GetProjectDto,
} from '@taskapp/shared';
import {
  GetSprintDto,
  GetSprintsDto,
  SprintResponseDto,
  SprintsResponseDto,
} from './dto';
import { GetSprintQuery, GetSprintsQuery } from './queries';

@Authentication()
@ApiTags('Sprints')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class SprintsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':pid/sprints')
  @ApiOperation({ description: 'List all sprints' })
  @ApiOkResponse({ type: SprintsResponseDto })
  async getAll(
    @Param() { pid }: GetProjectDto,
    @Query() dto: GetSprintsDto,
  ): Promise<SprintsResponseDto> {
    return this.queryBus.execute(new GetSprintsQuery(pid, dto));
  }

  @Get(':pid/sprints/:id')
  @ApiOperation({ description: 'Get sprint by id' })
  @ApiOkResponse({ type: SprintsResponseDto })
  async getOne(
    @Param() { pid }: GetProjectDto,
    @Param() { id }: GetSprintDto,
  ): Promise<SprintResponseDto> {
    return this.queryBus.execute(new GetSprintQuery(pid, id));
  }
}
