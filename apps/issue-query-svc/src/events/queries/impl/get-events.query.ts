import { IQuery } from '@nestjs/cqrs';
import { GetEventsDto } from '../../dto';

export class GetEventsQuery implements IQuery {
  constructor(public readonly dto: GetEventsDto) {}
}
