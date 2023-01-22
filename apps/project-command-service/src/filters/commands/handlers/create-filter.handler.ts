import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { EventPublisher } from 'nestjs-eventstore';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 } from 'uuid';
import { FilterAggregate } from '../../aggregations';
import { CreateFilterCommand } from '../impl';

@CommandHandler(CreateFilterCommand)
export class CreateFilterHandler
  implements ICommandHandler<CreateFilterCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(CreateFilterHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto, userId: ownerId }: CreateFilterCommand) {
    // TODO: db validation 409

    const filter = this.publisher.mergeObjectContext<any>(
      new FilterAggregate({
        ...dto,
        id: v4(),
        ownerId,
      }),
    );

    filter.create();
    filter.commit();

    return filter.id;
  }
}
