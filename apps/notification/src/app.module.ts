import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule, providers } from '@taskapp/service-core';
import { AmqpModule } from 'nestjs-amqp';
import { RedisModule } from 'nestjs-redis';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        SMTP_URL: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().required(),
        VAPID_PRIVATE_KEY: Joi.string().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
      }),
    }),
    CoreModule,
    MikroOrmModule.forRootAsync(providers.database),
    RedisModule.forRootAsync(providers.redisProvider),
    AmqpModule.forRootAsync(providers.queueProvider),
    NotificationsModule,
  ],
})
export class AppModule {}
