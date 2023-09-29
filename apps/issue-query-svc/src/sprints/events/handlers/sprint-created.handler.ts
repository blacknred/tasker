import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities/sprint.entity';

@EventsHandler(SprintCreatedEvent)
export class SprintCreatedHandler implements IEventHandler<SprintCreatedEvent> {
  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: EntityRepository<Sprint>,
    @InjectPinoLogger(SprintCreatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: SprintCreatedEvent) {
    try {
      await this.sprintRepository.create(data);
      await this.sprintRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
