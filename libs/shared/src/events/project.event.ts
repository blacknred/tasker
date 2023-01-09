import { IEvent } from '@nestjs/cqrs';
import { IProjectPreview } from '../interfaces';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly data: IProjectPreview) {}
}

export class ProjectUpdatedEvent implements IEvent {
  constructor(public readonly data: IProjectPreview) {}
}

export class ProjectDeletedEvent implements IEvent {
  constructor(public readonly id: IProjectPreview['id']) {}
}

export class ProjectRestoredEvent implements IEvent {
  constructor(public readonly id: IProjectPreview['id']) {}
}
