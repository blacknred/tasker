import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { NOTIFICATION_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { CreateCommentCommand } from '../impl';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @InjectPinoLogger(CreateCommentHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto }: CreateCommentCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext<any>(
      new IssueAggregate({
        ...dto,
      }),
    );

    issue.createComment();
    issue.commit();
  }
}
