import { Filter } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventRepository } from '@taskapp/shared';
import { CreateFilterHandler } from './commands';
import { DeleteFilterCommand, UpdateFilterCommand } from './commands';
import { FiltersController } from './filters.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Filter])],
  controllers: [FiltersController],
  providers: [
    EventRepository,
    CreateFilterHandler,
    UpdateFilterCommand,
    DeleteFilterCommand,
  ],
})
export class FiltersModule {}
