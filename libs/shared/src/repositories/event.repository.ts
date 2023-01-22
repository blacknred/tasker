import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Inject } from '@nestjs/common';
import { EventStore } from 'nestjs-eventstore';

export class EventRepository {
  constructor(
    @Inject(EventStore) private db: EventStore,
    @InjectPinoLogger(EventRepository.name)
    private readonly logger: PinoLogger,
  ) {}

  async findOne(stream: string) {
    // this.db.getConnection().readStreamEventsBackward(stream);
  }
}
