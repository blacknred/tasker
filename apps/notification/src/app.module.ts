import * as Joi from '@hapi/joi';
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from '@taskapp/service-core';
import { RedisModule } from 'nestjs-redis';
import { AsyncLocalStorage } from 'node:async_hooks';
import { NotificationsModule } from './notifications/notifications.module';

const ALS = new AsyncLocalStorage<any>();

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
        SMTP_USER: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().required(),
        VAPID_PRIVATE_KEY: Joi.string().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientUrl: configService.get('POSTGRES_URL'),
        debug: configService.get('NODE_ENV') === 'development',
        loadStrategy: LoadStrategy.JOINED,
        context: () => ALS.getStore(),
        registerRequestContext: false,
        autoLoadEntities: true,
        ensureIndexes: true,
        type: 'postgresql',
        flushMode: 1,
      }),
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
        showFriendlyErrorStack: configService.get('NODE_ENV') !== 'production',
        enableAutoPipelining: true,
      }),
    }),
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
