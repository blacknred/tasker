import { AggregateRoot } from '@nestjs/cqrs';
import {
  ID,
  ISprint,
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

  create(userId: ID) {
    this.apply(new SprintCreatedEvent(this, userId));
  }

  update(userId: ID) {
    this.apply(new SprintUpdatedEvent(this, userId));
  }

  delete(userId: ID) {
    // this.loadFromHistory([]);
    this.apply(new SprintDeletedEvent(this.id, this.projectId, userId));
  }
}
