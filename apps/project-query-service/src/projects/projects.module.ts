import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProjectUnArchivedEvent } from '@taskapp/shared';
import { Project } from './entities';
import {
  ProjectArchivedHandler,
  ProjectCreatedHandler,
  ProjectUpdatedHandler,
} from './events';
import { ProjectsController } from './projects.controller';
import { GetProjectHandler, GetProjectsHandler } from './queries';

@Module({
  imports: [MikroOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    GetProjectHandler,
    GetProjectsHandler,
    ProjectCreatedHandler,
    ProjectUpdatedHandler,
    ProjectArchivedHandler,
    ProjectUnArchivedEvent,
  ],
})
export class ProjectsModule {}
