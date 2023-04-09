import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SearchEntryUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Entry } from '../../entities/entry.entity';

@EventsHandler(SearchEntryUpdatedEvent)
export class SearchEntryUpdatedHandler
  implements IEventHandler<SearchEntryUpdatedEvent>
{
  constructor(
    @InjectRepository(Entry)
    private entryRepository: EntityRepository<Entry>,
    @InjectPinoLogger(SearchEntryUpdatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: SearchEntryUpdatedEvent) {
    try {
      const entry = await this.entryRepository.findOneOrFail(data.id);
      wrap(entry).assign(data);
      await this.entryRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
