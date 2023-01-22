import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ProjectAggregate } from '../../aggregations';
import { UpdateProjectCommand } from '../impl';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(UpdateProjectHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ id, dto }: UpdateProjectCommand) {
    // TODO: db validation 409

    const project = this.publisher.mergeObjectContext(
      new ProjectAggregate({ ...dto, id }),
    );

    project.update();
    project.commit();
  }
}
