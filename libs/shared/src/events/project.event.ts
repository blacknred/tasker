import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, IProject } from '../interfaces';

export class ProjectCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: IProject) {}
  get streamName() {
    return `project-${this.data.id}`;
  }
}

export class ProjectUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: IProject, public readonly emitterId: ID) {}
  get streamName() {
    return `project-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.id };
  }
}

export class ProjectArchivedEvent implements IAggregateEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  get streamName() {
    return `project-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.id };
  }
}

export class ProjectUnArchivedEvent implements IAggregateEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  get streamName() {
    return `project-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.id };
  }
}
