import { IEvent } from '@nestjs/cqrs';
import type { ID, IIssue } from '../interfaces';

export class IssueCreatedEvent implements IEvent {
  constructor(public readonly data: IIssue, public readonly emitterId: ID) {}
  streamName = () => `issue-${this.data.id}`;
}

export class IssueUpdatedEvent implements IEvent {
  constructor(public readonly data: IIssue, public readonly emitterId: ID) {}
  streamName = () => `issue-${this.data.id}`;
}

export class IssueDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `issue-${this.id}`;
}
