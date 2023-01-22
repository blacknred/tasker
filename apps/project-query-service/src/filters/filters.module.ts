import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Filter } from './entities';
import {
  FilterCreatedHandler,
  FilterDeletedHandler,
  FilterUpdatedHandler,
} from './events';
import { FiltersController } from './filters.controller';
import { GetFilterHandler, GetFiltersHandler } from './queries';

@Module({
  imports: [MikroOrmModule.forFeature([Filter])],
  controllers: [FiltersController],
  providers: [
    GetFilterHandler,
    GetFiltersHandler,
    FilterCreatedHandler,
    FilterUpdatedHandler,
    FilterDeletedHandler,
  ],
})
export class FiltersModule {}
