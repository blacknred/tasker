import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { cacheProvider } from './providers/cache.provider';
import { queueProvider } from './providers/queue.provider';
import { smtpProvider } from './providers/smtp.provider';

@Module({
  imports: [ConfigModule, MailerModule.forRootAsync(smtpProvider)],
  controllers: [NotificationsController],
  providers: [NotificationsService, cacheProvider, queueProvider],
})
export class NotificationsModule {}
