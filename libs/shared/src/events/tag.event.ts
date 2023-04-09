import { IAggregateEvent } from '@taskapp/eventstore';
import type { ID, ITag } from '../interfaces';

export class TagCreatedEvent implements IAggregateEvent {
  constructor(public readonly data: ITag, public readonly emitterId: ID) {}
  get streamName() {
    return `tag-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class TagUpdatedEvent implements IAggregateEvent {
  constructor(public readonly data: ITag, public readonly emitterId: ID) {}
  get streamName() {
    return `tag-${this.data.id}`;
  }
  get metadata() {
    return { $correlationId: this.data.projectId };
  }
}

export class TagDeletedEvent implements IAggregateEvent {
  constructor(
    public readonly id: ID,
    public readonly projectId: ID,
    public readonly emitterId: ID,
  ) {}
  get streamName() {
    return `tag-${this.id}`;
  }
  get metadata() {
    return { $correlationId: this.projectId };
  }
}
