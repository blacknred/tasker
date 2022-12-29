import * as Joi from '@hapi/joi';
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ASL, CoreModule } from '@taskapp/service-core';
import { RedisModule } from 'nestjs-redis';
import { INVOICE_SERVICE, NOTIFICATION_SERVICE } from './invoices/consts';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientUrl: configService.get('POSTGRES_URL'),
        debug: configService.get('NODE_ENV') === 'development',
        loadStrategy: LoadStrategy.JOINED,
        context: () => ASL.getStore(),
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
    CoreModule,
    InvoicesModule,
  ],
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'notifications',
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        }),
    },
    {
      provide: INVOICE_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'invoices',
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        }),
    },
  ],
})
export class AppModule {}
