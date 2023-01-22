import { IEvent } from '@nestjs/cqrs';
import type { IStatus } from '../interfaces';

export class StatusCreatedEvent implements IEvent {
  constructor(public readonly data: IStatus) {}
  streamName = () => `statuses-${this.data.projectId}`;
}

export class StatusUpdatedEvent implements IEvent {
  constructor(public readonly data: IStatus) {}
  streamName = () => `statuses-${this.data.projectId}`;
}

export class StatusDeletedEvent implements IEvent {
  constructor(public readonly data: IStatus) {}
  streamName = () => `statuses-${this.data.projectId}`;
}
