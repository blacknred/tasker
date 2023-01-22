import { IEvent } from '@nestjs/cqrs';
import type { IRole } from '../interfaces';

export class RoleCreatedEvent implements IEvent {
  constructor(public readonly data: IRole) {}
  streamName = () => `roles-${this.data.projectId}`;
}

export class RoleUpdatedEvent implements IEvent {
  constructor(public readonly data: IRole) {}
  streamName = () => `roles-${this.data.projectId}`;
}

export class RoleDeletedEvent implements IEvent {
  constructor(public readonly data: IRole) {}
  streamName = () => `roles-${this.data.projectId}`;
}
