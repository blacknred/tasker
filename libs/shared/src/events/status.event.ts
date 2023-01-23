import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, IStatus } from '../interfaces';

export class StatusCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: IStatus, public readonly emitterId: ID) {}
  get streamName() {
    return `status-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class StatusUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: IStatus, public readonly emitterId: ID) {}
  get streamName() {
    return `status-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class StatusDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `status-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
