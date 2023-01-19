import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SearchEntryDeletedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Entry } from '../../../../../../libs/shared/src/entities/search.entity';

@EventsHandler(SearchEntryDeletedEvent)
export class SearchEntryDeletedHandler
  implements IEventHandler<SearchEntryDeletedEvent>
{
  constructor(
    @InjectRepository(Entry)
    private entryRepository: EntityRepository<Entry>,
    @InjectPinoLogger(SearchEntryDeletedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: SearchEntryDeletedEvent) {
    try {
      await this.entryRepository.nativeDelete({ id });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
