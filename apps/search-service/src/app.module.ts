import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import {
  FilterCreatedEvent,
  FilterDeletedEvent,
  FilterUpdatedEvent,
  getEventStoreOptions,
  getOrmOptions,
  IssueCreatedEvent,
  IssueDeletedEvent,
  IssueUpdatedEvent,
  ProjectArchivedEvent,
  ProjectCreatedEvent,
  ProjectUnArchivedEvent,
  ProjectUpdatedEvent,
  TeammateCreatedEvent,
  TeammateDeletedEvent,
  TeammateUpdatedEvent,
} from '@taskapp/shared';
import * as Joi from 'joi';
import {
  EventStoreCqrsModule,
  EventStoreSubscriptionType,
} from 'nestjs-eventstore';
import { EntriesModule } from './entries/entries.module';

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
          stream: '$ce-filter',
        },
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-project',
        },
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-issue',
        },
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-teammate',
        },
      ],
      events: {
        FilterCreatedEvent,
        FilterUpdatedEvent,
        FilterDeletedEvent,
        ProjectCreatedEvent,
        ProjectUpdatedEvent,
        ProjectArchivedEvent,
        ProjectUnArchivedEvent,
        IssueCreatedEvent,
        IssueUpdatedEvent,
        IssueDeletedEvent,
        TeammateCreatedEvent,
        TeammateUpdatedEvent,
        TeammateDeletedEvent,
      },
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    CoreModule,
    EntriesModule,
  ],
})
export class AppModule {}
