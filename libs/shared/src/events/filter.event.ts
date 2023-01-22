import { IEvent } from '@nestjs/cqrs';
import type { IFilter } from '../interfaces';

export class FilterCreatedEvent implements IEvent {
  constructor(public readonly data: IFilter) {}
  streamName = () => `filter-${this.data.id}`;
}

export class FilterUpdatedEvent implements IEvent {
  constructor(public readonly data: Partial<IFilter>) {}
  streamName = () => `filter-${this.data.id}`;
}

export class FilterDeletedEvent implements IEvent {
  constructor(public readonly id: IFilter['id']) {}
  streamName = () => `filter-${this.id}`;
}
