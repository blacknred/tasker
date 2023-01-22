import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Entry } from '../../../../libs/shared/src/entities/search.entity';
import { EntriesController } from './entries.controller';
import { GetEntriesHandler } from './queries/handlers/get-entries.handler';

@Module({
  imports: [MikroOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [GetEntriesHandler],
})
export class EntriesModule {}
