import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IssueDeletedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Issue } from '../../entities';

@EventsHandler(IssueDeletedEvent)
export class IssueDeletedHandler implements IEventHandler<IssueDeletedEvent> {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: EntityRepository<Issue>,
    @InjectPinoLogger(IssueDeletedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: IssueDeletedEvent) {
    try {
      const issue = await this.issueRepository.findOneOrFail(id);
      await this.issueRepository.getEntityManager().removeAndFlush(issue);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
