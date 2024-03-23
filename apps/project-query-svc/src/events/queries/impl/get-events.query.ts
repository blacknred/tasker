import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';
import { GetEventsDto } from '../../dto';

export class GetEventsQuery implements IQuery {
  constructor(
    public readonly projectId: ID,
    public readonly dto: GetEventsDto,
  ) {}
}
