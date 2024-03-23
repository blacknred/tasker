import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 } from 'uuid';
import { SprintAggregate } from '../../aggregations/sprint.aggregate';
import { CreateSprintCommand } from '../impl';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, SEARCH_SERVICE } from '@taskapp/shared';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateSprintCommand)
export class CreateSprintHandler
  implements ICommandHandler<CreateSprintCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(CreateSprintHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto }: CreateSprintCommand) {
    // TODO: db validation 409

    const sprint = this.publisher.mergeObjectContext<any>(
      new SprintAggregate({
        ...dto,
        id: v4(),
      }),
    );

    sprint.create();
    sprint.commit();

    return sprint.id;
  }
}
