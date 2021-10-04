import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PushSubscriptionsService } from 'src/push-subscriptions/push-subscriptions.service';
import webpush, { RequestOptions } from 'web-push';
import { QUEUE_SERVICE } from './consts';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';

@Injectable()
export class NotificationsService {
  pushOptions: RequestOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly pushService: PushSubscriptionsService,
    @Inject(QUEUE_SERVICE) private readonly queueService: ClientProxy,
  ) {
    this.pushOptions = {
      vapidDetails: {
        subject: this.configService.get('CLIENT_HOST'),
        publicKey: this.configService.get('VAPID_PUBLIC_KEY'),
        privateKey: this.configService.get('VAPID_PRIVATE_KEY'),
      },
      TTL: 60 * 60,
    };
  }

  async push({ userId, payload }: CreatePushNotificationDto) {
    if (userId) {
      const { data: subscriptions } = await this.pushService.findAll({
        userId,
      });

      this.queueService.emit<any>('consume', {
        subscriptions,
        body: payload,
      });
    } else {
      const { data: subscriptions } = await this.pushService.findAll({});

      const chunkSize = 100;
      for (let i = 0, j = subscriptions.length; i < j; i += chunkSize) {
        this.queueService.emit<any>('consume', {
          subscriptions: subscriptions.slice(i, i + chunkSize),
          body: payload,
        });
      }
    }
  }

  async consume({ subscriptions, body }) {
    if (!subscriptions) {
      return;
    }

    for (const subscription of subscriptions) {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth,
          },
        },
        JSON.stringify(body),
        this.pushOptions,
      );
    }
  }
}
