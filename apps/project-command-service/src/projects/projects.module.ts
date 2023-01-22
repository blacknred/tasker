import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventRepository } from '@taskapp/shared';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    EventRepository,
    CreateProjectHandler,
    UpdateProjectCommand,
    DeleteFilterCommand,
  ],
})
export class ProjectsModule {}
