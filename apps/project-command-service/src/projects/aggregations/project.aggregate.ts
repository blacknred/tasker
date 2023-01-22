import { AggregateRoot } from '@nestjs/cqrs';
import {
  IProject,
  ProjectCreatedEvent,
  ProjectDeletedEvent,
  ProjectRestoredEvent,
  ProjectType,
  ProjectUpdatedEvent,
} from '@taskapp/shared';

export class ProjectAggregate extends AggregateRoot implements IProject {
  id!: string;

  authorId!: string;

  name!: string;

  key!: string;

  details?: string;

  image?: string;

  isUnlimited!: boolean;

  type!: ProjectType;

  createdAt!: string;

  constructor(data?: Partial<ProjectAggregate>) {
    super();
    Object.assign(this, data);
  }

  create() {
    this.apply(new ProjectCreatedEvent(this));
  }

  update() {
    this.apply(new ProjectUpdatedEvent(this));
  }

  delete() {
    this.apply(new ProjectDeletedEvent(this.id));
  }

  restore() {
    this.apply(new ProjectRestoredEvent(this.id));
  }
}
