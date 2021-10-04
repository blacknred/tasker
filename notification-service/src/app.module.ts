import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { PushSubscriptionsModule } from './push-subscriptions/push-subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        QUEUE_URL: Joi.string().required(),
        DB_URL: Joi.string().required(),
        CLIENT_HOST: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().required(),
        VAPID_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    PushSubscriptionsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
