import { IEvent } from '@nestjs/cqrs';
import type { ID, IProject } from '../interfaces';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly data: IProject) {}
  streamName = () => `project-${this.data.id}`;
}

export class ProjectUpdatedEvent implements IEvent {
  constructor(public readonly data: IProject, public readonly emitterId: ID) {}
  streamName = () => `project-${this.data.id}`;
}

export class ProjectArchivedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `project-${this.id}`;
}

export class ProjectUnArchivedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `project-${this.id}`;
}
