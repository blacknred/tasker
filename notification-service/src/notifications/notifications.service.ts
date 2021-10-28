import { ISendMailOptions, MailerService } from '@nest-modules/mailer';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import webpush, { PushSubscription, RequestOptions } from 'web-push';
import { CACHE_SERVICE, CHUNK_SIZE, QUEUE_SERVICE } from './consts';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationType } from './interfaces/notification.interface';
import { RedisAdapter } from './utils/redis.adapter';

@Injectable()
export class NotificationsService {
  pushOptions: RequestOptions;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_SERVICE) private readonly cacheService: RedisAdapter,
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

  async notify({ type, payload, userId, targets }: CreateNotificationDto) {
    if (targets) {
      const rejectedTargets = [];

      for (const target of targets) {
        try {
          switch (type) {
            case NotificationType.PUSH:
              const { statusCode } = await webpush.sendNotification(
                target as PushSubscription,
                JSON.stringify(payload),
                this.pushOptions,
              );

              if (statusCode !== HttpStatus.OK) {
                rejectedTargets.push(target);
              }

              break;
            case NotificationType.EMAIL:
              await this.mailerService.sendMail(target as ISendMailOptions);
              break;
            case NotificationType.SMS:
              break;
            default:
              break;
          }
        } catch (e) {
          rejectedTargets.push(target);
        }
      }

      if (rejectedTargets.length) {
        this.queueService.emit('notify', {
          targets: rejectedTargets,
          payload,
          type,
        });
      }
    } else {
      const allTargets = [];

      switch (type) {
        case NotificationType.PUSH:
          if (userId) {
            const { pushSubscriptions } = await this.cacheService.get(
              `sess:${userId}`,
            );
            allTargets.push(...pushSubscriptions);
          } else {
            const sessions = await this.cacheService.get(`sess`);
            allTargets.push(...sessions.map((sess) => sess.pushSubscriptions));
          }
          break;
        case NotificationType.EMAIL:
          if (userId) {
            const { email } = await this.cacheService.get(`sess:${userId}`);
            allTargets.push({
              to: email,
              subject: 'notification',
              text: JSON.stringify(payload),
            });
          } else {
            const sessions = await this.cacheService.get(`sess`);
            allTargets.push(
              sessions.map((sess) => ({
                to: sess.email,
                subject: 'notification',
                text: JSON.stringify(payload),
              })),
            );
          }
          break;
        case NotificationType.SMS:
          break;
        default:
          break;
      }

      for (let i = 0, j = allTargets.length; i < j; i += CHUNK_SIZE) {
        this.queueService.emit('notify', {
          targets: allTargets.slice(i, i + CHUNK_SIZE),
          payload,
          type,
        });
      }
    }
  }
}
