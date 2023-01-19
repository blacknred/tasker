import { IEvent } from '@nestjs/cqrs';
import type { IUserPreview } from '../interfaces';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly data: IUserPreview) {}
}

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly data: IUserPreview) {}
}
