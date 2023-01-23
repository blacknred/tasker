import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Entry } from './entities/entry.entity';
import { EntriesController } from './entries.controller';
import { GetEntriesHandler } from './queries/handlers/get-entries.handler';

@Module({
  imports: [MikroOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [GetEntriesHandler],
})
export class EntriesModule {}
