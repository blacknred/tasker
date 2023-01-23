import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, ITeammate } from '../interfaces';

export class TeammateCreatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: ITeammate,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `teammate-${this.data.accountId}:${this.data.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class TeammateUpdatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: ITeammate,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `teammate-${this.data.accountId}:${this.data.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class TeammateDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly accountId: ID,
    public readonly roleId: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `teammate-${this.accountId}:${this.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
