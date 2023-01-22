import { IEvent } from '@nestjs/cqrs';
import type { ID, IStatus } from '../interfaces';

export class StatusCreatedEvent implements IEvent {
  constructor(public readonly data: IStatus, public readonly emitterId: ID) {}
  streamName = () => `status-${this.data.id}`;
}

export class StatusUpdatedEvent implements IEvent {
  constructor(public readonly data: IStatus, public readonly emitterId: ID) {}
  streamName = () => `status-${this.data.id}`;
}

export class StatusDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `status-${this.id}`;
}
