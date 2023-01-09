import { IEvent } from '@nestjs/cqrs';
import { INotification } from '../interfaces';

export class NotificationCreatedEvent implements IEvent {
  constructor(readonly data: INotification, readonly isSecured = false) {}
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
