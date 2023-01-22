import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { RequestOptions } from 'web-push';
import { Notification } from './entities';

@Injectable()
export class NotificationsService {
  pushOptions: RequestOptions;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
    @InjectRepository(Notification)
    private notificationRepository: EntityRepository<Notification>,
    @InjectPinoLogger(NotificationsService.name)
    private readonly logger: PinoLogger,
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

  // async notify({ type, payload, userId, targets }: CreateNotificationDto) {
  //   if (targets) {
  //     const rejectedTargets = [];

  //     for (const target of targets) {
  //       try {
  //         switch (type) {
  //           case NotificationType.PUSH:
  //             const { statusCode } = await webpush.sendNotification(
  //               target as PushSubscription,
  //               JSON.stringify(payload),
  //               this.pushOptions,
  //             );

  //             if (statusCode !== HttpStatus.OK) {
  //               rejectedTargets.push(target);
  //             }

  //             break;
  //           case NotificationType.EMAIL:
  //             await this.mailerService.sendMail(target as ISendMailOptions);
  //             break;
  //           case NotificationType.SMS:
  //             break;
  //           default:
  //             break;
  //         }
  //       } catch (e) {
  //         rejectedTargets.push(target);
  //       }
  //     }

  //     if (rejectedTargets.length) {
  //       this.queueService.emit('notify', {
  //         targets: rejectedTargets,
  //         payload,
  //         type,
  //       });
  //     }
  //   } else {
  //     const allTargets = [];

  //     switch (type) {
  //       case NotificationType.PUSH:
  //         if (userId) {
  //           const { pushSubscriptions } = await this.cacheService.getAsync(
  //             `sess:${userId}`,
  //           );
  //           allTargets.push(...pushSubscriptions);
  //         } else {
  //           const sessions = await this.cacheService.getAsync(`sess`);
  //           allTargets.push(...sessions.map((sess) => sess.pushSubscriptions));
  //         }
  //         break;
  //       case NotificationType.EMAIL:
  //         if (userId) {
  //           const { email } = await this.cacheService.getAsync(
  //             `sess:${userId}`,
  //           );
  //           allTargets.push({
  //             to: email,
  //             subject: 'notification',
  //             text: JSON.stringify(payload),
  //           });
  //         } else {
  //           const sessions = await this.cacheService.getAsync(`sess`);
  //           allTargets.push(
  //             sessions.map((sess) => ({
  //               to: sess.email,
  //               subject: 'notification',
  //               text: JSON.stringify(payload),
  //             })),
  //           );
  //         }
  //         break;
  //       case NotificationType.SMS:
  //         break;
  //       default:
  //         break;
  //     }

  //     for (let i = 0, j = allTargets.length; i < j; i += CHUNK_SIZE) {
  //       this.queueService.emit('notify', {
  //         targets: allTargets.slice(i, i + CHUNK_SIZE),
  //         payload,
  //         type,
  //       });
  //     }
  //   }
  // }
}
