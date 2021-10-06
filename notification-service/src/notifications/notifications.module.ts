import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nest-modules/mailer';
import { PushSubscriptionsModule } from 'src/push-subscriptions/push-subscriptions.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { queueProvider } from './providers/queue.provider';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('SMTP_URL'),
        defaults: {
          from: 'Tasker <notification@dev.dev>',
        },
        logger: true,
        debug: false,
      }),
    }),
    PushSubscriptionsModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, queueProvider],
})
export class NotificationsModule {}
