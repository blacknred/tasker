import { IEvent } from '@nestjs/cqrs';
import { NotificationTransport } from '../enums';
import type { INotification } from '../interfaces';

export class NotificationCreatedEvent implements IEvent {
  constructor(
    readonly data: INotification,
    readonly transport = NotificationTransport.DEFAULT,
  ) {}
}

// export class TeammateRoleDeletedEvent implements IEvent {
//   constructor(public readonly id: ITeammate['id']) {}
// }

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
