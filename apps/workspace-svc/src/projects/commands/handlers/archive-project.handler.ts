import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectAggregate } from '../../aggregations';
import { ArchiveProjectCommand } from '../impl';

@CommandHandler(ArchiveProjectCommand)
export class ArchiveProjectHandler
  implements ICommandHandler<ArchiveProjectCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(ArchiveProjectHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id }: ArchiveProjectCommand) {
    // TODO: db validation 409

    const project = this.publisher.mergeObjectContext(
      new ProjectAggregate({ id }),
    );

    project.archivate();
    const i = project.getUncommittedEvents();
    project.commit();
  }
}
