import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, GetProjectDto } from '@taskapp/shared';
import { EventsResponseDto, GetEventsDto } from './dto';
import { GetEventsQuery } from './queries';

@ApiTags('Events')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class EventsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':pid/events')
  @ApiOperation({ description: 'List all events' })
  @ApiOkResponse({ type: EventsResponseDto })
  async getAll(
    @Param() { pid }: GetProjectDto,
    @Query() dto: GetEventsDto,
  ): Promise<EventsResponseDto> {
    return this.queryBus.execute(new GetEventsQuery(pid, dto));
  }
}
