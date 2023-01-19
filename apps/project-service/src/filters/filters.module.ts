import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { Filter } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { FiltersController } from './filters.controller';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-filter',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-filter',
        },
      ],
      eventHandlers: null,
    }),
    MikroOrmModule.forFeature([Filter]),
  ],
  controllers: [FiltersController],
  providers: [
    GetEntriesHandler,
    SearchEntryCreatedHandler,
    SearchEntryUpdatedHandler,
    SearchEntryDeletedHandler,
  ],
})
export class FiltersModule {}
