import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectAggregate } from '../../aggregations';
import { DeleteProjectCommand } from '../impl';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(DeleteProjectCommand.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id }: DeleteProjectCommand) {
    // TODO: db validation 409

    const project = this.publisher.mergeObjectContext(
      new ProjectAggregate({ id }),
    );

    project.delete();
    project.commit();
  }
}
