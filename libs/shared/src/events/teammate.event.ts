import { IEvent } from '@nestjs/cqrs';
import type { ID, ITeammate } from '../interfaces';

export class TeammateCreatedEvent implements IEvent {
  constructor(public readonly data: ITeammate, public readonly emitterId: ID) {}
  streamName = () => `teammate-${this.data.userId}:${this.data.roleId}`;
}

export class TeammateUpdatedEvent implements IEvent {
  constructor(public readonly data: ITeammate, public readonly emitterId: ID) {}
  streamName = () => `teammate-${this.data.userId}:${this.data.roleId}`;
}

export class TeammateDeletedEvent implements IEvent {
  constructor(
    public readonly userId: ID,
    public readonly roleId: ID,
    public readonly emitterId: ID,
  ) {}
  streamName = () => `teammate-${this.userId}:${this.roleId}`;
}
