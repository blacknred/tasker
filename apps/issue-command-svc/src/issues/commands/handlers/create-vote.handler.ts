import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { NOTIFICATION_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { CreateVoteCommand } from '../impl';

@CommandHandler(CreateVoteCommand)
export class CreateVoteHandler implements ICommandHandler<CreateVoteCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @InjectPinoLogger(CreateVoteHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto }: CreateVoteCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext<any>(
      new IssueAggregate({
        ...dto,
      }),
    );

    issue.createVote();
    issue.commit();
  }
}
