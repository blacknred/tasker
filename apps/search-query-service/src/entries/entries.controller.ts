import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, Auth, User } from '@taskapp/shared';
import { GetEntriesQuery } from './queries/impl/get-entries.query';
import { EntriesResponseDto } from './dto/entries-response.dto';
import { GetEntriesDto } from './dto/get-entries.dto';

@Auth()
@ApiTags('Search')
@Controller('search')
@UseFilters(AllExceptionFilter)
export class EntriesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all search results' })
  @ApiOkResponse({ type: EntriesResponseDto })
  getAll(
    @User('id') userId,
    @User('projects') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<EntriesResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
  }
}
