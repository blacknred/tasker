import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_FROM } from './consts';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { cacheProvider } from './providers/cache.provider';
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
          from: EMAIL_FROM,
        },
        logger: true,
        debug: false,
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, cacheProvider, queueProvider],
})
export class NotificationsModule {}
