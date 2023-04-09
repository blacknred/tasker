import type { IAccount } from './account.interface';
import type { ID } from './base.interface';

export interface INotification {
  body: string;
  recipients: ID[];
  directRecipients: ID[];
  createdAt: string | Date;
}

export type IHydratedNotification = INotification;

export interface UserNotificationTransport
  extends Pick<
    IAccount,
    'email' | 'phone' | 'notificationMethod' | 'securedNotificationMethod'
  > {
  pushTokens: string[];
}
