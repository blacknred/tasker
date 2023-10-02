import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { DeleteSubscriptionCommand } from '../impl';

@CommandHandler(DeleteSubscriptionCommand)
export class DeleteSubscriptionHandler
  implements ICommandHandler<DeleteSubscriptionCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(DeleteSubscriptionHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, userId }: DeleteSubscriptionCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext(new IssueAggregate({ id }));

    issue.deleteSubscription(userId);
    issue.commit();
  }
}
