import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IAggregateEvent } from '../aggregate-event.interface';
import { EventBusProvider } from './event-bus.provider';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class EventPublisher {
  constructor(private readonly eventBus: EventBusProvider) {}

  mergeClassContext<T extends Constructor<AggregateRoot<IAggregateEvent>>>(
    metatype: T,
  ): T {
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IAggregateEvent) {
        const { streamName, metadata } = event;
        eventBus.publish(event, streamName, metadata);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot<IAggregateEvent>>(object: T): T {
    const eventBus = this.eventBus;
    object.publish = (event: IAggregateEvent) => {
      const { streamName, metadata } = event;
      eventBus.publish(event, streamName, metadata);
    };
    return object;
  }
}
