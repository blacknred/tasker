import { IEvent } from '@nestjs/cqrs';
import { ISearchRecord } from '../interfaces';

export class SearchRecordCreatedEvent implements IEvent {
  constructor(public readonly data: ISearchRecord) {}
}

export class SearchRecordUpdatedEvent implements IEvent {
  constructor(public readonly data: ISearchRecord) {}
}

export class SearchRecordDeletedEvent implements IEvent {
  constructor(public readonly data: ISearchRecord['id']) {}
}
