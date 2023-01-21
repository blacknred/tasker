import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import {
  getAmqpOptions,
  getEventStoreOptions,
  getOrmOptions,
  IFilter,
} from '@taskapp/shared';
import * as Joi from 'joi';
import { AmqpModule } from 'nestjs-amqp';
import {
  EventStoreCqrsModule,
  EventStoreSubscriptionType,
} from 'nestjs-eventstore';
import { FiltersModule } from './filters/filters.module';
import { ProjectsModule } from './projects/projects.module';
import { SprintsModule } from './sprints/sprints.module';

export class FilterCreatedEvent {
  constructor(public data: IFilter) {}

  streamName() {
    return `filters-${this.data.id}`;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        EVENTSTORE_URL: Joi.string().required(),
      }),
    }),
    EventStoreCqrsModule.forRootAsync(getEventStoreOptions(), {
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$ce-filters',
          persistentSubscriptionName: 'filters',
        },
      ],
      events: {
        FilterCreatedEvent,
        FilterUpdatedEvent,
        FilterDeletedEvent,
      },
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    AmqpModule.forRootAsync(getAmqpOptions()),
    CoreModule,
    ProjectsModule,
    SprintsModule,
    FiltersModule,
  ],
  // providers: [
  //   {
  //     provide: 'NOTIFICATION_SERVICE',
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService) =>
  //       ClientProxyFactory.create({
  //         transport: Transport.RMQ,
  //         options: {
  //           urls: [configService.get('RABBITMQ_URL')],
  //           queue: 'notifications',
  //           noAck: false,
  //           queueOptions: {
  //             durable: true,
  //           },
  //         },
  //       }),
  //   },
  // ],
})
export class AppModule {}
