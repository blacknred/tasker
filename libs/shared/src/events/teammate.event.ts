import { IEvent } from '@nestjs/cqrs';
import type { ITeammate } from '../interfaces';

export class TeammateCreatedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}

export class TeammateUpdatedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}

export class TeammateDeletedEvent implements IEvent {
  constructor(public readonly data: ITeammate) {}
  streamName = () => `teammates-${this.data.role.projectId}`;
}
