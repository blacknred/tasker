import { ID } from './base.interface';
import { IUser } from './user.interface';

export interface INotification {
  body: string;
  recipients: ID[];
  directRecipients: ID[];
  createdAt: string;
}

export interface UserNotificationTransport
  extends Pick<
    IUser,
    'email' | 'phone' | 'notificationTransport' | 'securedNotificationTransport'
  > {
  pushTokens: string[];
}
