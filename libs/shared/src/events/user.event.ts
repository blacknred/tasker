import { IEvent } from '@nestjs/cqrs';
import type { IUser } from '../interfaces';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly data: IUser) {}
}

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly data: IUser) {}
}
