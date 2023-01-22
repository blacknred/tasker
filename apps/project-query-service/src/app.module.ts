import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import {
  FilterCreatedEvent,
  FilterDeletedEvent,
  FilterUpdatedEvent,
  getAmqpOptions,
  getEventStoreOptions,
  getOrmOptions,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
  SprintCreatedEvent,
  SprintDeletedEvent,
  SprintUpdatedEvent,
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

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        EVENTSTORE_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    EventStoreCqrsModule.forRootAsync(getEventStoreOptions(), {
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$ce-filter',
          persistentSubscriptionName: 'filters',
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$ce-project',
          persistentSubscriptionName: 'projects',
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$ce-sprint',
          persistentSubscriptionName: 'sprints',
        },
      ],
      events: {
        FilterCreatedEvent,
        FilterUpdatedEvent,
        FilterDeletedEvent,
        ProjectCreatedEvent,
        ProjectUpdatedEvent,
        SprintCreatedEvent,
        SprintUpdatedEvent,
        SprintDeletedEvent,
      },
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    AmqpModule.forRootAsync(getAmqpOptions()),
    CoreModule,
    ProjectsModule,
    SprintsModule,
    FiltersModule,
  ],
})
export class AppModule {}
