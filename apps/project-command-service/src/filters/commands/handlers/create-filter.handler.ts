import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Filter } from '@taskapp/shared';
import { CreateFilterCommand } from '../impl/create-filter.command';

@CommandHandler(CreateFilterCommand)
export class CreateFilterHandler
  implements ICommandHandler<CreateFilterCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ dto, userId }: CreateFilterCommand) {
    const filter = this.publisher.mergeObjectContext(
      new Filter({ ...dto, ownerId: userId }),
    );

    filter.createFilter();
    filter.createSearchEntry();
    filter.commit();
    return filter.id;
  }
}
