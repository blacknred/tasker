import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { CreateSubscriptionCommand } from '../impl';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(CreateSubscriptionHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ issueId, userId }: CreateSubscriptionCommand) {
    // TODO: db validation 409
    // const issue = this.publisher.mergeObjectContext<any>(
    //   new IssueAggregate({
    //     ...dto,
    //   }),
    // );
    // issue.createSubscription();
    // issue.commit();
  }
}
