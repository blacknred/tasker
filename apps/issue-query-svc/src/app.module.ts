import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import {
  EventStoreCqrsModule,
  EventStoreSubscriptionType,
} from '@taskapp/eventstore';
import {
  IssueCreatedEvent,
  IssueDeletedEvent,
  IssueUpdatedEvent,
  SprintCreatedEvent,
  SprintDeletedEvent,
  SprintUpdatedEvent,
  getEventStoreOptions,
  getOrmOptions,
} from '@taskapp/shared';
import { IssuesModule } from './issues/issues.module';
import { SprintsModule } from './sprints/sprints.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        EVENTSTORE_URL: Joi.string().required(),
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
        IssueCreatedEvent,
        IssueUpdatedEvent,
        IssueDeletedEvent,
        SprintCreatedEvent,
        SprintUpdatedEvent,
        SprintDeletedEvent,
      },
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    CoreModule,
    IssuesModule,
    SprintsModule,
    EventsModule,
  ],
})
export class AppModule {}
