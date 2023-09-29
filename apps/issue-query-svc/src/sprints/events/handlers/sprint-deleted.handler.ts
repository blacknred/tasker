import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintDeletedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities/sprint.entity';

@EventsHandler(SprintDeletedEvent)
export class SprintDeletedHandler implements IEventHandler<SprintDeletedEvent> {
  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: EntityRepository<Sprint>,
    @InjectPinoLogger(SprintDeletedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: SprintDeletedEvent) {
    try {
      const project = await this.sprintRepository.findOneOrFail(id);
      // project.deletedAt = undefined;
      await this.sprintRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
