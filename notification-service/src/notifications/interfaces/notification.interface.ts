import { IPushSubscription } from 'src/push-subscriptions/entities/interfaces/push-subscription.interface';

export enum NotificationType {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export interface INotification {
  type: NotificationType;
  payload: string | Record<string, unknown>;
  subscriptions: Array<IPushSubscription>; // +email & sms
}
