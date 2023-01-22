import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FilterAggregate } from '../../aggregations';
import { UpdateFilterCommand } from '../impl';

@CommandHandler(UpdateFilterCommand)
export class UpdateFilterHandler
  implements ICommandHandler<UpdateFilterCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(UpdateFilterCommand.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, dto, userId: ownerId }: UpdateFilterCommand) {
    // TODO: db validation 409

    const filter = this.publisher.mergeObjectContext(
      new FilterAggregate({ ...dto, id, ownerId }),
    );

    filter.update();
    filter.commit();
  }
}
