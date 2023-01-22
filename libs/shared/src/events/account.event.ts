import { IEvent } from '@nestjs/cqrs';
import type { IAccount, ID } from '../interfaces';

export class AccountCreatedEvent implements IEvent {
  constructor(public readonly data: IAccount) {}
  streamName = () => `account-${this.data.id}`;
}

export class AccountUpdatedEvent implements IEvent {
  constructor(public readonly data: IAccount) {}
  streamName = () => `account-${this.data.id}`;
}

export class AccountDeletedEvent implements IEvent {
  constructor(public readonly id: ID) {}
  streamName = () => `account-${this.id}`;
}
