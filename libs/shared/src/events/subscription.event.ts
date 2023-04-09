import { IAggregateEvent } from '@taskapp/eventstore';
import type { ISubscription } from '../interfaces';

export class SubscriptionCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: ISubscription) {}
  get streamName() {
    return `subscription-${this.data.issueId}`;
  }
}

export class SubscriptionDeletedEvent implements IAggregateEvent {
  constructor(public readonly data: ISubscription) {}
  get streamName() {
    return `subscription-${this.data.issueId}`;
  }
}
