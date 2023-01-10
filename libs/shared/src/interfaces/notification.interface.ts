import type { ID } from './base.interface';
import type { IUser } from './user.interface';

export interface INotification {
  body: string;
  recipients: ID[];
  directRecipients: ID[];
  createdAt: string;
}

export interface UserNotificationTransport
  extends Pick<
    IUser,
    'email' | 'phone' | 'notificationMethod' | 'securedNotificationMethod'
  > {
  pushTokens: string[];
}
