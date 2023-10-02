import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '@taskapp/shared';
import { EventsResponseDto, GetEventsDto } from './dto';
import { GetEventsQuery } from './queries';

@ApiTags('Events')
@Controller('events')
@UseFilters(AllExceptionFilter)
export class EventsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all events' })
  @ApiOkResponse({ type: EventsResponseDto })
  async getAll(@Query() dto: GetEventsDto): Promise<EventsResponseDto> {
    return this.queryBus.execute(new GetEventsQuery(dto));
  }
}
