import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        CACHE_URL: Joi.string().required(),
        QUEUE_URL: Joi.string().required(),
        SMTP_URL: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().required(),
        VAPID_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    NotificationsModule,
  ],
})
export class AppModule {}
