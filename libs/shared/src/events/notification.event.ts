import { IEvent } from '@nestjs/cqrs';
import type { INotification } from '../interfaces';

export enum NotificationTransport {
  EMAIL = 'EMAIL',
  SECURED = 'SECURED',
  DEFAULT = 'DEFAULT',
}

export class NotificationCreatedEvent implements IEvent {
  constructor(
    readonly data: INotification,
    readonly transport = NotificationTransport.DEFAULT,
  ) {}
}

// export class UserNotificationDataUpdatedEvent implements IEvent {
//   constructor(
//     public readonly data: Pick<
//       IUser,
//       | 'email'
//       | 'phone'
//       | 'notificationTransport'
//       | 'securedNotificationTransport'
//     >,
//   ) {}
// }

// auth[module,controlller,service]
// tokens[module,service]

// transports[module,controlller,service]
// notifications[module,controlller,service]
