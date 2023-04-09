import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, IIssue } from '../interfaces';

export class IssueCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: IIssue, public readonly emitterId: ID) {}
  get streamName() {
    return `issue-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class IssueUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: IIssue, public readonly emitterId: ID) {}
  get streamName() {
    return `issue-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class IssueDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `issue-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
