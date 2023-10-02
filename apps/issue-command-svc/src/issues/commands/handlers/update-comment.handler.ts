import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { NOTIFICATION_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { UpdateCommentCommand } from '../impl/update-comment.command';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @InjectPinoLogger(UpdateCommentHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, dto, userId }: UpdateCommentCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext(
      new IssueAggregate({ ...dto, id }),
    );

    issue.updateComment(userId);
    issue.commit();
  }
}
