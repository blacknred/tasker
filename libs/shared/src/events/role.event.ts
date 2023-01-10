import { IEvent } from '@nestjs/cqrs';
import type { IProjectRole } from '../interfaces';

export class ProjectRoleCreatedEvent implements IEvent {
  constructor(public readonly data: IProjectRole) {}
}

export class ProjectRoleUpdatedEvent implements IEvent {
  constructor(public readonly data: IProjectRole) {}
}

export class ProjectRoleDeletedEvent implements IEvent {
  constructor(public readonly id: IProjectRole['id']) {}
}
