import { IAggregateEvent } from '@taskapp/eventstore';
import type { IVote } from '../interfaces';

export class VoteCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: IVote) {}
  get streamName() {
    return `vote-${this.data.issueId}`;
  }
}

export class VoteDeletedEvent implements IAggregateEvent {
  constructor(public readonly data: IVote) {}
  get streamName() {
    return `vote-${this.data.issueId}`;
  }
}
