import { IAggregateEvent } from '@taskapp/eventstore';
import type { IComment, ID } from '../interfaces';

export class CommentCreatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: IComment,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `comment-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class CommentUpdatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: IComment,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `comment-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class CommentDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `comment-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
