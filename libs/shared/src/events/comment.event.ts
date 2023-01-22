import { IEvent } from '@nestjs/cqrs';
import type { IComment, ID } from '../interfaces';

export class CommentCreatedEvent implements IEvent {
  constructor(public readonly data: IComment, public readonly emitterId: ID) {}
  streamName = () => `comment-${this.data.id}`;
}

export class CommentUpdatedEvent implements IEvent {
  constructor(public readonly data: IComment, public readonly emitterId: ID) {}
  streamName = () => `comment-${this.data.id}`;
}

export class CommentDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `comment-${this.id}`;
}
