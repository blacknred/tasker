import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectAggregate } from '../../aggregations';
import { UnArchiveProjectCommand } from '../impl';

@CommandHandler(UnArchiveProjectCommand)
export class UnArchiveProjectHandler
  implements ICommandHandler<UnArchiveProjectCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(UnArchiveProjectHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id }: UnArchiveProjectCommand) {
    // TODO: db validation 409

    const project = this.publisher.mergeObjectContext(
      new ProjectAggregate({ id }),
    );

    project.archive();
    project.commit();
  }
}
