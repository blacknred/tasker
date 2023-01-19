import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  SearchEntryCreatedEvent,
  SearchEntryDeletedEvent,
  SearchEntryUpdatedEvent,
} from '@taskapp/shared';
import { SearchEntryCreatedHandler } from './cqrs/events/handlers/search-entry-created.handler';
import { SearchEntryDeletedHandler } from './cqrs/events/handlers/search-entry-deleted.handler';
import { SearchEntryUpdatedHandler } from './cqrs/events/handlers/search-entry-updated.handler';
import { GetEntriesHandler } from './cqrs/queries/handlers/get-entries.handler';
import { Entry } from './entities/entry.entity';
import { EntriesController } from './entries.controller';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-search',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-filter',
        },
        {
          type: EventStoreSubscriptionType.Persistent,
          stream: '$ce-project',
          persistentSubscriptionName: 'search',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-issue',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-teammate',
        },
      ],
      eventHandlers: {
        SearchEntryCreatedEvent: (data) => new SearchEntryCreatedEvent(data),
        SearchEntrytUpdatedEvent: (data) => new SearchEntryUpdatedEvent(data),
        SearchEntryDeletedEvent: (data) => new SearchEntryDeletedEvent(data),
      },
    }),
    MikroOrmModule.forFeature([Entry]),
  ],
  controllers: [EntriesController],
  providers: [
    GetEntriesHandler,
    SearchEntryCreatedHandler,
    SearchEntryUpdatedHandler,
    SearchEntryDeletedHandler,
  ],
})
export class EntriesModule {}
