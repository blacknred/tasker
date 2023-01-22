import { AggregateRoot } from '@nestjs/cqrs';
import {
  ISprint,
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  ProjectUpdatedEvent,
  SprintCreatedEvent,
  SprintDeletedEvent,
  SprintUpdatedEvent,
} from '@taskapp/shared';

export class SprintAggregate extends AggregateRoot implements ISprint {
  id!: string;

  projectId!: string;

  authorId!: string;

  name!: string;

  details?: string;

  createdAt!: string;

  startsAt!: string;

  endsAt!: string;

  constructor(data?: Partial<SprintAggregate>) {
    super();
    Object.assign(this, data);
  }

  create() {
    this.apply(new SprintCreatedEvent(this));
  }

  update() {
    this.apply(new SprintUpdatedEvent(this, ));
  }

  delete() {
    this.loadFromHistory([])
    this.apply(new SprintDeletedEvent(this.id));
  }
}


sprint(id)? => allowedProjects.includes(.project_id) ? OK : 403 : 409
allowedProjects.includes(project_id) ? sprint(id) ? project_id==project_id ? OK : 403 : 409 : 403

exist?
project_id ACCESS & PERMISSION