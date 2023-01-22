import { IEvent } from '@nestjs/cqrs';
import type { ITag } from '../interfaces';

export class TagCreatedEvent implements IEvent {
  constructor(public readonly data: ITag) {}
  streamName = () => `tags-${this.data.projectId}`;
}

export class TagUpdatedEvent implements IEvent {
  constructor(public readonly data: ITag) {}
  streamName = () => `tags-${this.data.projectId}`;
}

export class TagDeletedEvent implements IEvent {
  constructor(public readonly data: ITag) {}
  streamName = () => `tags-${this.data.projectId}`;
}
