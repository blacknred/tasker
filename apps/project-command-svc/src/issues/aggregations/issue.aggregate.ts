import { AggregateRoot } from '@nestjs/cqrs';
import {
  ID,
  IIssue,
  IssueCreatedEvent,
  IssueDeletedEvent,
  IssueUpdatedEvent,
} from '@taskapp/shared';

export class IssueAggregate extends AggregateRoot implements IIssue {
  id!: string;

  projectId!: string;

  authorId!: string;

  name!: string;

  details?: string;

  createdAt!: string;

  startsAt!: string;

  endsAt!: string;

  constructor(data?: Partial<IssueAggregate>) {
    super();
    Object.assign(this, data);
  }

  create(userId: ID) {
    this.apply(new IssueCreatedEvent(this, userId));
  }

  update(userId: ID) {
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  delete(userId: ID) {
    // this.loadFromHistory([]);
    this.apply(new IssueDeletedEvent(this.id, this.projectId, userId));
  }

  createComment(userId: ID) {
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  updateComment(userId: ID) {
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  deleteComment(userId: ID) {
    // this.loadFromHistory([]);
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  createVote(userId: ID) {
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  deleteVote(userId: ID) {
    // this.loadFromHistory([]);
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  createSubscription(userId: ID) {
    this.apply(new IssueUpdatedEvent(this, userId));
  }

  deleteSubscription(userId: ID) {
    // this.loadFromHistory([]);
    this.apply(new IssueUpdatedEvent(this, userId));
  }
}
