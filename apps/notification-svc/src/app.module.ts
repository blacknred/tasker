import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getOrmOptions, getRedisOptions } from '@taskapp/shared';
import * as Joi from 'joi';
import { RedisModule } from 'nestjs-redis';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SMTP_URL: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().optional(),
        VAPID_PRIVATE_KEY: Joi.string().optional(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    RedisModule.forRootAsync(getRedisOptions()),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        debug: configService.get('NODE_ENV') === 'development',
        transport: configService.get('SMTP_URL'),
        defaults: { from: configService.get('SMTP_USER') },
        logger: true,
      }),
    }),
    CoreModule,
    NotificationsModule,
  ],
})
export class AppModule {}
