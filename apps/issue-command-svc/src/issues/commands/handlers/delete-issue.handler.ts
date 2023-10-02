import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { NOTIFICATION_SERVICE, SEARCH_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { DeleteIssueCommand } from '../impl';

@CommandHandler(DeleteIssueCommand)
export class DeleteIssueHandler implements ICommandHandler<DeleteIssueCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(DeleteIssueHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, userId }: DeleteIssueCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext(new IssueAggregate({ id }));

    issue.delete(userId);
    issue.commit();
  }
}
