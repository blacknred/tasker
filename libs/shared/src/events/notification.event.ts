import { Deserializer } from '@nestjs/microservices';
import { NotificationTransport } from '../enums';
import type { INotification } from '../interfaces';

export class NotificationEvent {
  constructor(
    readonly data: INotification,
    readonly transport = NotificationTransport.DEFAULT,
  ) {}
}

export class NotificationDeserializer
  implements Deserializer<string, NotificationEvent>
{
  deserialize(message) {
    return new NotificationEvent(message.data, message.transport);
  }
}

// api change-unlim -> off ? redis(del unlimited:pid) : InvoiceCreatedEvent
// InvoicePaidEvent -> redis(true,ttl) -> queue(mon, InvoiceCreatedEvent)
