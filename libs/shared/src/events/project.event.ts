import { IEvent } from '@nestjs/cqrs';
import type { IProject } from '../interfaces';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly data: IProject) {}
  streamName = () => `projects-${this.data.id}`;
}

export class ProjectUpdatedEvent implements IEvent {
  constructor(public readonly data: IProject) {}
  streamName = () => `projects-${this.data.id}`;
}

export class ProjectDeletedEvent implements IEvent {
  constructor(public readonly id: IProject['id']) {}
  streamName = () => `projects-${this.id}`;
}

export class ProjectRestoredEvent implements IEvent {
  constructor(public readonly id: IProject['id']) {}
  streamName = () => `projects-${this.id}`;
}
