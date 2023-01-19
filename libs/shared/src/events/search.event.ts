import { IEvent } from '@nestjs/cqrs';
import type { ISearchEntry } from '../interfaces';

export class SearchEntryCreatedEvent implements IEvent {
  constructor(public readonly data: ISearchEntry) {}
}

export class SearchEntryUpdatedEvent implements IEvent {
  constructor(public readonly data: ISearchEntry) {}
}

export class SearchEntryDeletedEvent implements IEvent {
  constructor(public readonly id: ISearchEntry['id']) {}
}
