import { IEvent } from '@nestjs/cqrs';
import { ID, InvoiceType } from '../interfaces';

export class InvoiceCreatedEvent implements IEvent {
  constructor(readonly type: InvoiceType, readonly targetId: ID) {}
}

export class InvoicePaidEvent implements IEvent {
  constructor(readonly type: InvoiceType, readonly targetId: ID) {}
}

// api change-unlim -> off ? redis(del unlimited:pid) : InvoiceCreatedEvent
// InvoicePaidEvent -> redis(true,ttl) -> queue(mon, InvoiceCreatedEvent)
