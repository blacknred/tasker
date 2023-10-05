import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SprintAggregate } from '../../aggregations/sprint.aggregate';
import { UpdateSprintCommand } from '../impl';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, SEARCH_SERVICE } from '@taskapp/shared';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateSprintCommand)
export class UpdateSprintHandler
  implements ICommandHandler<UpdateSprintCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(UpdateSprintCommand.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, dto, userId }: UpdateSprintCommand) {
    // TODO: db validation 409

    const sprint = this.publisher.mergeObjectContext(
      new SprintAggregate({ ...dto, id }),
    );

    sprint.update(userId);
    sprint.commit();
  }
}
