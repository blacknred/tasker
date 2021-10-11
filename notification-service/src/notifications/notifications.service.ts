import { MailerService } from '@nest-modules/mailer';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { RedisClient } from 'redis';
import webpush, { RequestOptions } from 'web-push';
import { CACHE_SERVICE, CHUNK_SIZE, QUEUE_SERVICE } from './consts';
import { NewNotificationDto } from './dto/new-notification.dto';
import {
  INotification,
  NotificationType,
} from './interfaces/notification.interface';

@Injectable()
export class NotificationsService {
  pushOptions: RequestOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_SERVICE) private readonly cacheService: RedisClient,
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

  async notify({ type, payload, userId, subscriptions }: NewNotificationDto) {
    if (subscriptions) {
      const rejectedSubscriptions = [];

      for (const subscription of subscriptions) {
        try {
          switch (type) {
            case NotificationType.PUSH:
              const { statusCode } = await webpush.sendNotification(
                subscription,
                JSON.stringify(payload),
                this.pushOptions,
              );

              if (statusCode !== HttpStatus.OK) {
                rejectedSubscriptions.push(subscription);
              }

              break;
            case NotificationType.EMAIL:
              await this.mailerService.sendMail(subscription);
              // {
              //   to: user.email,
              //   subject: 'Password changed',
              //   html,
              // }
              break;
            case NotificationType.SMS:
              break;
            default:
              break;
          }
        } catch (e) {
          console.log(e);
          rejectedSubscriptions.push(subscription);
        }
      }

      if (rejectedSubscriptions.length) {
        this.queueService.emit<string, INotification>('notify', {
          subscriptions: rejectedSubscriptions,
          payload,
          type,
        });
      }
    } else {
      const subscriptions = [];

      switch (type) {
        case NotificationType.PUSH:
          if (userId) {
            const { clients } = await this.cacheService.get(`sess:${userId}`);
            subscriptions.push(...clients);
          } else {
            const sessions = await this.cacheService.get(`sess`);
            subscriptions.push(...sessions.map(session => session.clients));
          }
          break;
        case NotificationType.EMAIL:
          if (userId) {
            const { email } = await this.cacheService.get(`sess:${userId}`);
            subscriptions.push({
              to: email,
              subject: payload.subject,
              html: '',
            });
          } else {
            const sessions = await this.cacheService.get(`sess`);
            subscriptions.push(sessions.map(session => ({
              to: session.email,
              subject: payload.subject,
              html: '',
            }));
          }
          break;
        case NotificationType.SMS:
          break;
        default:
          break;
      }

      for (let i = 0, j = subscriptions.length; i < j; i += CHUNK_SIZE) {
        this.queueService.emit<string, INotification>('notify', {
          subscriptions: subscriptions.slice(i, i + CHUNK_SIZE),
          payload,
          type,
        });
      }
    }
  }
}
