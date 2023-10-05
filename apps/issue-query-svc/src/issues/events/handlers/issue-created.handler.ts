import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IssueCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Issue } from '../../entities';

@EventsHandler(IssueCreatedEvent)
export class IssueCreatedHandler implements IEventHandler<IssueCreatedEvent> {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: EntityRepository<Issue>,
    @InjectPinoLogger(IssueCreatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: IssueCreatedEvent) {
    try {
      const issue = await this.issueRepository.create(data);
      await this.issueRepository.getEntityManager().persistAndFlush(issue);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
