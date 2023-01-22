import { IEvent } from '@nestjs/cqrs';
import type { IFilter } from '../interfaces';

export class FilterCreatedEvent implements IEvent {
  constructor(public readonly data: IFilter) {}
  streamName = () => `filters-${this.data.ownerId || 'common'}`;
}

export class FilterUpdatedEvent implements IEvent {
  constructor(
    public readonly data: Partial<IFilter>,
    public readonly ownerId: IFilter['ownerId'],
  ) {}
  streamName = () => `filters-${this.ownerId || 'common'}`;
}

export class FilterDeletedEvent implements IEvent {
  constructor(
    public readonly id: IFilter['id'],
    public readonly ownerId: IFilter['ownerId'],
  ) {}
  streamName = () => `filters-${this.ownerId || 'common'}`;
}
