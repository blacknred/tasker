import { PushSubscription } from 'web-push';
import { ISendMailOptions } from '@nest-modules/mailer';
import { NotificationType } from '../interfaces/notification.interface';

export class CreateNotificationDto {
  type: NotificationType;
  payload: string | Record<string, unknown>;
  userId?: number;
  targets?: Array<PushSubscription | ISendMailOptions>;
}
