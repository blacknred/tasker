import { IEvent } from '@nestjs/cqrs';
import { ISprintPreview } from '../interfaces';

export class SprintCreatedEvent implements IEvent {
  constructor(public readonly data: ISprintPreview) {}
}

export class SprintUpdatedEvent implements IEvent {
  constructor(public readonly data: ISprintPreview) {}
}

export class SprintDeletedEvent implements IEvent {
  constructor(public readonly id: ISprintPreview['id']) {}
}
