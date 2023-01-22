import { IEvent } from '@nestjs/cqrs';
import type { ID } from '../interfaces';

export class SubscriptionCreatedEvent implements IEvent {
  constructor(public readonly userId: ID, public readonly issueId: ID) {}
  streamName = () => `subscriptions-${this.userId}`;
}

export class SubscriptionDeletedEvent implements IEvent {
  constructor(public readonly userId: ID, public readonly issueId: ID) {}
  streamName = () => `subscriptions-${this.userId}`;
}
