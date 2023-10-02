import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { CoreModule } from '@taskapp/core';
import { EventStoreCqrsModule } from '@taskapp/eventstore';
import {
  getAmqpOptions,
  getEventStoreOptions,
  getNotificationClientOptions,
  getSearchClientOptions,
} from '@taskapp/shared';
import { AmqpModule } from 'nestjs-amqp';
import { IssuesModule } from './issues/issues.module';
import { SprintsModule } from './sprints/sprints.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        EVENTSTORE_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
      }),
    }),
    EventStoreCqrsModule.forRootAsync(getEventStoreOptions(), null),
    AmqpModule.forRootAsync(getAmqpOptions()),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
    ClientsModule.registerAsync([getSearchClientOptions()]),
    CoreModule,
    IssuesModule,
    SprintsModule,
  ],
})
export class AppModule {}
