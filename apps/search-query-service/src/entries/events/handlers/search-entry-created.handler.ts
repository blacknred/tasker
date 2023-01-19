import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SearchEntryCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Entry } from '../../../../../../libs/shared/src/entities/search.entity';

@EventsHandler(SearchEntryCreatedEvent)
export class SearchEntryCreatedHandler
  implements IEventHandler<SearchEntryCreatedEvent>
{
  constructor(
    @InjectRepository(Entry)
    private entryRepository: EntityRepository<Entry>,
    @InjectPinoLogger(SearchEntryCreatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: SearchEntryCreatedEvent) {
    try {
      await this.entryRepository.create(data);
      await this.entryRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
