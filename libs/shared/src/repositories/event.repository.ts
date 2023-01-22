import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Inject } from '@nestjs/common';
import { EventStore } from 'nestjs-eventstore';
import { EventStoreNodeConnection } from 'node-eventstore-client';

export class EventRepository {
  private conn: EventStoreNodeConnection;
  constructor(
    @Inject(EventStore) private db: EventStore,
    @InjectPinoLogger(EventRepository.name)
    private readonly logger: PinoLogger,
  ) {
    this.conn = this.db.getConnection();
  }

  async findOne(stream: string) {
    const t = await this.conn.readStreamEventsForward(stream, 0, 1);
    t.events[0].event.data.toJSON();
  }
}
