import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PushSubscriptionsModule } from 'src/push-subscriptions/push-subscriptions.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { queueProvider } from './providers/queue.provider';

@Module({
  imports: [ConfigModule, PushSubscriptionsModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, queueProvider],
})
export class NotificationsModule {}
