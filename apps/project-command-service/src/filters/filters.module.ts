import { Filter } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateFilterHandler } from './commands/handlers/create-filter.handler';
import { FiltersController } from './filters.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Filter])],
  controllers: [FiltersController],
  providers: [CreateFilterHandler],
})
export class FiltersModule {}
