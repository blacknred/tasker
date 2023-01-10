import { IEvent } from '@nestjs/cqrs';
import type { IProject } from '../interfaces';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly data: IProject) {}
}

export class ProjectUpdatedEvent implements IEvent {
  constructor(public readonly data: IProject) {}
}

export class ProjectDeletedEvent implements IEvent {
  constructor(public readonly id: IProject['id']) {}
}

export class ProjectRestoredEvent implements IEvent {
  constructor(public readonly id: IProject['id']) {}
}
