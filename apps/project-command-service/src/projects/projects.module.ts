import { Module } from '@nestjs/common';
import { EventRepository } from '@taskapp/shared';
import {
  ArchiveProjectHandler,
  CreateProjectHandler,
  UnArchiveProjectHandler,
  UpdateProjectHandler,
} from './commands';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [
    EventRepository,
    CreateProjectHandler,
    UpdateProjectHandler,
    ArchiveProjectHandler,
    UnArchiveProjectHandler,
  ],
})
export class ProjectsModule {}
