import { IPushSubscription } from 'src/push-subscriptions/interfaces/push-subscription.interface';

export enum NotificationType {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export interface INotification {
  type: NotificationType;
  payload: string;
  subscriptions: Array<IPushSubscription>; // +email & sms
}
