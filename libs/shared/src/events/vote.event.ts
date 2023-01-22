import { IEvent } from '@nestjs/cqrs';
import type { ID } from '../interfaces';

export class VoteCreatedEvent implements IEvent {
  constructor(public readonly userId: ID, public readonly issueId: ID) {}
  streamName = () => `votes-${this.userId}`;
}

export class VoteDeletedEvent implements IEvent {
  constructor(public readonly userId: ID, public readonly issueId: ID) {}
  streamName = () => `votes-${this.userId}`;
}
