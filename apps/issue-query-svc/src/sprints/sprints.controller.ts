import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '@taskapp/shared';
import {
  GetSprintDto,
  GetSprintsDto,
  SprintResponseDto,
  SprintsResponseDto,
} from './dto';
import { GetSprintQuery, GetSprintsQuery } from './queries';

@ApiTags('Sprints')
@Controller('sprints')
@UseFilters(AllExceptionFilter)
export class SprintsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all sprints' })
  @ApiOkResponse({ type: SprintsResponseDto })
  async getAll(@Query() dto: GetSprintsDto): Promise<SprintsResponseDto> {
    return this.queryBus.execute(new GetSprintsQuery(dto));
  }

  @Get(':id')
  @ApiOperation({ description: 'Get sprint by id' })
  @ApiOkResponse({ type: SprintsResponseDto })
  async getOne(@Param() { id }: GetSprintDto): Promise<SprintResponseDto> {
    return this.queryBus.execute(new GetSprintQuery(id));
  }
}
