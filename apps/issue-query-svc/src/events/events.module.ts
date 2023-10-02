import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { GetEventsHandler } from './queries';

@Module({
  controllers: [EventsController],
  providers: [GetEventsHandler],
})
export class EventsModule {}
