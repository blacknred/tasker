import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventsResponseDto } from '../../dto';
import { GetEventsQuery } from '../impl/get-events.query';

@QueryHandler(GetEventsQuery)
export class GetEventsHandler implements IQueryHandler<GetEventsQuery> {
  // constructor() {}

  async execute(query: GetEventsQuery): Promise<EventsResponseDto> {
    const { dto } = query;
    const { limit, offset, ...rest } = dto;

    return {};
  }
}
