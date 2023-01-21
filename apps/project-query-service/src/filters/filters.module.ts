import { Filter } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FiltersController } from './filters.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Filter])],
  controllers: [FiltersController],
  providers: [
    GetEntriesHandler,
    SearchEntryCreatedHandler,
    SearchEntryUpdatedHandler,
    SearchEntryDeletedHandler,
  ],
})
export class FiltersModule {}
