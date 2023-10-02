import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectUnArchivedEvent } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Project } from '../../entities';

@EventsHandler(ProjectUnArchivedEvent)
export class ProjectUnArchivedHandler
  implements IEventHandler<ProjectUnArchivedEvent>
{
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
    @InjectPinoLogger(ProjectUnArchivedHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async handle({ id }: ProjectUnArchivedEvent) {
    try {
      const project = await this.projectRepository.findOneOrFail(id);
      project.deletedAt = undefined;
      await this.projectRepository.flush();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
