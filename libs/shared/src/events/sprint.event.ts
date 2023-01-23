import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, ISprint } from '../interfaces';

export class SprintCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: ISprint, public readonly emitterId: ID) {}
  get streamName() {
    return `sprint-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class SprintUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: ISprint, public readonly emitterId: ID) {}
  get streamName() {
    return `sprint-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class SprintDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `sprint-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
