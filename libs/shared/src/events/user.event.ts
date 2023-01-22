import { IEvent } from '@nestjs/cqrs';
import type { IUser } from '../interfaces';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}

export class UserDeletedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}
