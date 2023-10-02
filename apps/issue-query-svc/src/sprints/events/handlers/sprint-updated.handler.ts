import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities';

@EventsHandler(SprintUpdatedEvent)
export class SprintUpdatedHandler implements IEventHandler<SprintUpdatedEvent> {
  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: EntityRepository<Sprint>,
    @InjectPinoLogger(SprintUpdatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data: { id, ...rest } }: SprintUpdatedEvent) {
    try {
      const sprint = await this.sprintRepository.findOneOrFail(id);
      wrap(sprint).assign(rest);
      await this.sprintRepository.getEntityManager().persistAndFlush(sprint);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
