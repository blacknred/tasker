import { IEvent } from '@nestjs/cqrs';
import type { IComment } from '../interfaces';

export class CommentCreatedEvent implements IEvent {
  constructor(public readonly data: IComment) {}
  streamName = () => `comments-${this.data.author.userId}`;
}

export class CommentUpdatedEvent implements IEvent {
  constructor(public readonly data: IComment) {}
  streamName = () => `comments-${this.data.author.userId}`;
}

export class CommentDeletedEvent implements IEvent {
  constructor(public readonly data: IComment) {}
  streamName = () => `comments-${this.data.author.userId}`;
}
