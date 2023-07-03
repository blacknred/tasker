import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import {
  getAmqpOptions,
  getEventStoreOptions,
  getOrmOptions,
  ProjectArchivedEvent,
  ProjectCreatedEvent,
  ProjectUnArchivedEvent,
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
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-project',
        },
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-sprint',
        },
      ],
      events: {
        ProjectCreatedEvent,
        ProjectUpdatedEvent,
        ProjectArchivedEvent,
        ProjectUnArchivedEvent,
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
  ],
})
export class AppModule {}
