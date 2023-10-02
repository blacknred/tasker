import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { NOTIFICATION_SERVICE, SEARCH_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SprintAggregate } from '../../aggregations/sprint.aggregate';
import { DeleteSprintCommand } from '../impl';

@CommandHandler(DeleteSprintCommand)
export class DeleteSprintHandler
  implements ICommandHandler<DeleteSprintCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(DeleteSprintCommand.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, userId }: DeleteSprintCommand) {
    // TODO: db validation 409

    const sprint = this.publisher.mergeObjectContext(
      new SprintAggregate({ id }),
    );

    sprint.delete(userId);
    sprint.commit();
  }
}
