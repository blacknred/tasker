import { NotificationType } from '../interfaces/notification.interface';
import { PushSubscription } from 'web-push';
import { SendMailOptions } from 'nodemailer';

export class NewNotificationDto {
  type: NotificationType;
  payload: string | Record<string, unknown>;
  userId?: number;
  subscriptions?: Array<PushSubscription | SendMailOptions>;
}
