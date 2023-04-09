import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, IMember } from '../interfaces';

export class MemberCreatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: IMember,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `member-${this.data.accountId}:${this.data.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class MemberUpdatedEvent implements IAggregateEvent {
  constructor(
    public readonly data: IMember,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `member-${this.data.accountId}:${this.data.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}

export class MemberDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly accountId: ID,
    public readonly roleId: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `member-${this.accountId}:${this.roleId}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
