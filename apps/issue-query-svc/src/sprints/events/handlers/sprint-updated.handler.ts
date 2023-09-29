import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities/sprint.entity';

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
      const project = await this.sprintRepository.findOneOrFail(id);
      wrap(project).assign(rest);
      await this.sprintRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
