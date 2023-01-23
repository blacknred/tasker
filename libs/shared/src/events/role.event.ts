import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, IRole } from '../interfaces';

export class RoleCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: IRole, public readonly emitterId: ID) {}
  get streamName() {
    return `role-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class RoleUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: IRole, public readonly emitterId: ID) {}
  get streamName() {
    return `role-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class RoleDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `role-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
