import { IEvent } from '@nestjs/cqrs';
import type { ID, ISprint } from '../interfaces';

export class SprintCreatedEvent implements IEvent {
  constructor(public readonly data: ISprint, public readonly emitterId: ID) {}
  streamName = () => `sprint-${this.data.id}`;
}

export class SprintUpdatedEvent implements IEvent {
  constructor(public readonly data: ISprint, public readonly emitterId: ID) {}
  streamName = () => `sprint-${this.data.id}`;
}

export class SprintDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `sprint-${this.id}`;
}
