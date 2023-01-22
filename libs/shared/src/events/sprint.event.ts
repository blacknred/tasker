import { IEvent } from '@nestjs/cqrs';
import type { ISprint } from '../interfaces';

export class SprintCreatedEvent implements IEvent {
  constructor(public readonly data: ISprint) {}
  streamName = () => `sprints-${this.data.projectId}`;
}

export class SprintUpdatedEvent implements IEvent {
  constructor(public readonly data: ISprint) {}
  streamName = () => `sprints-${this.data.projectId}`;
}

export class SprintDeletedEvent implements IEvent {
  constructor(public readonly data: ISprint) {}
  streamName = () => `sprints-${this.data.projectId}`;
}
