import { IEvent } from '@nestjs/cqrs';

export interface IAggregateEvent extends IEvent {
  streamName: string;
  metadata?: Record<string, string>;
}
