import { Injectable } from '@nestjs/common';
import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { EventBusProvider } from './event-bus.provider';
import { IAggregateEvent } from '../aggregate-event.interface';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class EventPublisher {
  constructor(private readonly eventBus: EventBusProvider) {}

  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IEvent) {
        const { streamName, metadata } = event as IAggregateEvent;
        eventBus.publish(event, streamName, metadata);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    const eventBus = this.eventBus;
    object.publish = (event: IEvent) => {
      const { streamName, metadata } = event as IAggregateEvent;
      eventBus.publish(event, streamName, metadata);
    };
    return object;
  }
}
