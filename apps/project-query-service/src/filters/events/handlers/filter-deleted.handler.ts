import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FilterDeletedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Filter } from '../../entities';

@EventsHandler(FilterDeletedEvent)
export class FilterDeletedHandler implements IEventHandler<FilterDeletedEvent> {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: EntityRepository<Filter>,
    @InjectPinoLogger(FilterDeletedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: FilterDeletedEvent) {
    try {
      await this.filterRepository.nativeDelete({ id });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
