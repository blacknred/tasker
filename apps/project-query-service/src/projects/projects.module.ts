import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Project } from './entities';
import { ProjectCreatedHandler, ProjectUpdatedHandler } from './events';
import { ProjectsController } from './projects.controller';
import { GetProjectHandler, GetProjectsHandler } from './queries';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    GetProjectHandler,
    GetProjectsHandler,
    ProjectCreatedHandler,
    ProjectUpdatedHandler,
  ],
})
export class ProjectsModule {}
