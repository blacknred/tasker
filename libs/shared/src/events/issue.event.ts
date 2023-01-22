import { IEvent } from '@nestjs/cqrs';
import type { IIssue } from '../interfaces';

export class IssueCreatedEvent implements IEvent {
  constructor(public readonly data: IIssue) {}
  streamName = () => `statuses-${this.data.projectId}`;
}

export class IssueUpdatedEvent implements IEvent {
  constructor(public readonly data: IIssue) {}
  streamName = () => `statuses-${this.data.projectId}`;
}

export class IssueDeletedEvent implements IEvent {
  constructor(public readonly data: IIssue) {}
  streamName = () => `statuses-${this.data.projectId}`;
}
