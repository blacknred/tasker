import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SprintCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Sprint } from '../../entities';

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
      const sprint = await this.sprintRepository.create(data);
      await this.sprintRepository.getEntityManager().persistAndFlush(sprint);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
