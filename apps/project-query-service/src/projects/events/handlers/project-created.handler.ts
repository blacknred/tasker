import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectCreatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Project } from '../../entities';

@EventsHandler(ProjectCreatedEvent)
export class ProjectCreatedHandler
  implements IEventHandler<ProjectCreatedEvent>
{
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
    @InjectPinoLogger(ProjectCreatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data }: ProjectCreatedEvent) {
    try {
      await this.projectRepository.create(data);
      await this.projectRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
