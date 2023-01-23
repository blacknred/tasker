import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 } from 'uuid';
import { ProjectAggregate } from '../../aggregations';
import { CreateProjectCommand } from '../impl';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @InjectPinoLogger(CreateProjectHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto }: CreateProjectCommand) {
    // TODO: db validation 409

    const project = this.publisher.mergeObjectContext<any>(
      new ProjectAggregate({
        ...dto,
        id: v4(),
      }),
    );

    project.create();
    project.commit();

    return project.id;
  }
}
