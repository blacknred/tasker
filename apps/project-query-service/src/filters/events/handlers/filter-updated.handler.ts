import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FilterUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Filter } from '../../entities';

@EventsHandler(FilterUpdatedEvent)
export class FilterUpdatedHandler implements IEventHandler<FilterUpdatedEvent> {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: EntityRepository<Filter>,
    @InjectPinoLogger(FilterUpdatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data: { id, ...rest } }: FilterUpdatedEvent) {
    try {
      const filter = await this.filterRepository.findOneOrFail(id);
      wrap(filter).assign(rest);
      await this.filterRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
