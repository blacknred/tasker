import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PushSubscriptionsService } from 'src/push-subscriptions/push-subscriptions.service';
import webpush, { RequestOptions } from 'web-push';
import { CHUNK_SIZE, QUEUE_SERVICE } from './consts';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  INotification,
  NotificationType,
} from './interfaces/notification.interface';

@Injectable()
export class NotificationsService {
  pushOptions: RequestOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly pushService: PushSubscriptionsService,
    @Inject(QUEUE_SERVICE) private readonly queueService: ClientProxy,
  ) {
    this.pushOptions = {
      TTL: 60 * 60,
      vapidDetails: {
        subject: 'mailto:web-push-book@gauntface.com', // TODO:
        publicKey: this.configService.get('VAPID_PUBLIC_KEY'),
        privateKey: this.configService.get('VAPID_PRIVATE_KEY'),
      },
    };
  }

  async push({ userId, payload }: CreateNotificationDto) {
    const params = userId ? { userId } : null;
    const { data: subscriptions } = await this.pushService.findAll(params);

    for (let i = 0, j = subscriptions.length; i < j; i += CHUNK_SIZE) {
      this.queueService.emit<string, INotification>('consume', {
        subscriptions: subscriptions.slice(i, i + CHUNK_SIZE),
        type: NotificationType.PUSH,
        payload,
      });
    }
  }

  async email(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
  }

  async sms(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
  }

  async consume({ type, subscriptions, payload }: INotification) {
    const rejectedSubscriptions = [];

    for (const subscription of subscriptions) {
      switch (type) {
        case NotificationType.PUSH:
          const { statusCode } = await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
              },
            },
            JSON.stringify(payload),
            this.pushOptions,
          );

          if (statusCode !== HttpStatus.OK) {
            rejectedSubscriptions.push(subscription);
          }

          break;
        case NotificationType.EMAIL:
          break;
        case NotificationType.SMS:
          break;
        default:
          break;
      }
    }

    if (rejectedSubscriptions.length) {
      this.queueService.emit<string, INotification>('consume', {
        subscriptions: rejectedSubscriptions,
        payload,
        type,
      });
    }
  }
}
