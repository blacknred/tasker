import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectUpdatedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Project } from '../../entities';

@EventsHandler(ProjectUpdatedEvent)
export class ProjectUpdatedHandler
  implements IEventHandler<ProjectUpdatedEvent>
{
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
    @InjectPinoLogger(ProjectUpdatedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ data: { id, ...rest } }: ProjectUpdatedEvent) {
    try {
      const project = await this.projectRepository.findOneOrFail(id);
      wrap(project).assign(rest);
      await this.projectRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
