import { Module } from '@nestjs/common';
import { EventRepository } from '@taskapp/shared';
import {
  CreateFilterHandler,
  DeleteFilterHandler,
  UpdateFilterHandler,
} from './commands';
import { FiltersController } from './filters.controller';

@Module({
  controllers: [FiltersController],
  providers: [
    EventRepository,
    CreateFilterHandler,
    UpdateFilterHandler,
    DeleteFilterHandler,
  ],
})
export class FiltersModule {}
