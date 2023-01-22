import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FilterCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Filter } from '../../entities';

@EventsHandler(FilterCreatedEvent)
export class FilterCreatedHandler implements IEventHandler<FilterCreatedEvent> {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: EntityRepository<Filter>,
    @InjectPinoLogger(FilterCreatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: FilterCreatedEvent) {
    try {
      await this.filterRepository.create(data);
      await this.filterRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
