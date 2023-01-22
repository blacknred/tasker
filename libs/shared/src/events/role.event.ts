import { IEvent } from '@nestjs/cqrs';
import type { ID, IRole } from '../interfaces';

export class RoleCreatedEvent implements IEvent {
  constructor(public readonly data: IRole, public readonly emitterId: ID) {}
  streamName = () => `role-${this.data.id}`;
}

export class RoleUpdatedEvent implements IEvent {
  constructor(public readonly data: IRole, public readonly emitterId: ID) {}
  streamName = () => `role-${this.data.id}`;
}

export class RoleDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `role-${this.id}`;
}
