import { IEvent } from '@nestjs/cqrs';
import type { ID, InvoiceType } from '../interfaces';

export class InvoiceCreatedEvent implements IEvent {
  constructor(readonly type: InvoiceType, readonly targetId: ID) {}
}

export class InvoicePaidEvent implements IEvent {
  constructor(readonly type: InvoiceType, readonly targetId: ID) {}
}

// api change-unlim -> off ? redis(del unlimited:pid) : InvoiceCreatedEvent
// InvoicePaidEvent -> redis(true,ttl) -> queue(mon, InvoiceCreatedEvent)


// shared
//   models
// commands
//   users
//     commands
//       handlers
//       impl
//     dto
//     users.controller.ts
//     users.module.ts
//   roles
//     commands
//       handlers
//       impl
//     dto
//     users.controller.ts
//     users.module.ts
//   commands.module.ts
// queries
//   users
//     events
//       handlers
//     queries
//       handlers
//       impl
//     dto
//     users.controller.ts
//     users.module.ts
//   roles
//     events
//       handlers
//     queries
//       handlers
//       impl
//     dto
//     users.controller.ts
//     users.module.ts
//   queries.module.ts
// app.module.ts
// main.ts


// users
//   commands
//     handlers
//     impl
//   events
//     handlers
//   queries
//     handlers
//     impl
//   dto
//   models
//   users.controller.ts
//   users.module.ts
// roles
//   commands
//     handlers
//     impl
//   sagas
//   events
//     handlers
//   queries
//     handlers
//     impl
//   dto
//   models
//   roles.controller.ts
//   roles.module.ts
// roles


// post dto -> command(no db model) -> ES(event)

// ES(event) -> aggr(model db persist)
// get dto <-> query(no model db)