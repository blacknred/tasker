import { PushSubscription } from 'web-push';
import { ISendMailOptions } from '@nest-modules/mailer';

export enum NotificationType {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export class NewNotificationDto {
  type: NotificationType;
  payload: string | Record<string, unknown>;
  userId?: number;
  targets?: Array<PushSubscription | ISendMailOptions>;
}
