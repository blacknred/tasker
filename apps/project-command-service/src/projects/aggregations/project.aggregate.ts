import { AggregateRoot } from '@nestjs/cqrs';
import {EventStoreBus, EventBusProvider} from 'nestjs-eventstore';
import {
  IProject,
  ProjectArchivedEvent,
  ProjectCreatedEvent,
  ProjectType,
  ProjectUnArchivedEvent,
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
    this.getUncommittedEvents(
  }

  archivate() {
    new EventStoreBus().
    this.apply(new ProjectArchivedEvent(this.id));
  }

  unarchivate() {
    this.apply(new ProjectUnArchivedEvent(this.id));
  }
}
