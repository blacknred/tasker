import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, Auth, Session } from '@taskapp/shared';
import {
  FilterResponseDto,
  FiltersResponseDto,
  GetFilterDto,
  GetFiltersDto,
} from './dto';
import { GetFilterQuery, GetFiltersQuery } from './queries';

@Auth()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all filters' })
  @ApiOkResponse({ type: FiltersResponseDto })
  async getAll(
    @Session('userId') userId,
    @Query() dto: GetFiltersDto,
  ): Promise<FiltersResponseDto> {
    return this.queryBus.execute(new GetFiltersQuery(dto, userId));
  }

  @Get(':id')
  @ApiOperation({ description: 'Get filter by id' })
  @ApiOkResponse({ type: FilterResponseDto })
  async getOne(
    @Session('userId') userId,
    @Param() { id }: GetFilterDto,
  ): Promise<FilterResponseDto> {
    return this.queryBus.execute(new GetFilterQuery(id, userId));
  }
}
