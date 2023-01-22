import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FilterAggregate } from '../../aggregations';
import { DeleteFilterCommand } from '../impl';

@CommandHandler(DeleteFilterCommand)
export class DeleteFilterHandler
  implements ICommandHandler<DeleteFilterCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(DeleteFilterCommand.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, userId: ownerId }: DeleteFilterCommand) {
    // TODO: db validation 409

    const filter = this.publisher.mergeObjectContext(
      new FilterAggregate({ id, ownerId }),
    );

    filter.delete();
    filter.commit();
  }
}
