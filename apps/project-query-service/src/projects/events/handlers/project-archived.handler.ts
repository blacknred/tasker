import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectArchivedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Project } from '../../entities';

@EventsHandler(ProjectArchivedEvent)
export class ProjectArchivedHandler
  implements IEventHandler<ProjectArchivedEvent>
{
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
    @InjectPinoLogger(ProjectArchivedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: ProjectArchivedEvent) {
    try {
      const project = await this.projectRepository.findOneOrFail(id);
      project.deletedAt = new Date();
      await this.projectRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
