import { IEvent } from '@nestjs/cqrs';
import type { ID, ITag } from '../interfaces';

export class TagCreatedEvent implements IEvent {
  constructor(public readonly data: ITag, public readonly emitterId: ID) {}
  streamName = () => `tag-${this.data.id}`;
}

export class TagUpdatedEvent implements IEvent {
  constructor(public readonly data: ITag, public readonly emitterId: ID) {}
  streamName = () => `tag-${this.data.id}`;
}

export class TagDeletedEvent implements IEvent {
  constructor(public readonly id: ID, public readonly emitterId: ID) {}
  streamName = () => `tag-${this.id}`;
}
