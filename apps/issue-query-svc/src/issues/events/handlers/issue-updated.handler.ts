import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IssueUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Issue } from '../../entities';

@EventsHandler(IssueUpdatedEvent)
export class IssueUpdatedHandler implements IEventHandler<IssueUpdatedEvent> {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: EntityRepository<Issue>,
    @InjectPinoLogger(IssueUpdatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data: { id, ...rest } }: IssueUpdatedEvent) {
    try {
      const issue = await this.issueRepository.findOneOrFail(id);
      wrap(issue).assign(rest);
      await this.issueRepository.getEntityManager().persistAndFlush(issue);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
