import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintDeletedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities';

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
      await this.sprintRepository.getEntityManager().removeAndFlush(project);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
