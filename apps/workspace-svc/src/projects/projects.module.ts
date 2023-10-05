import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectsService } from './projects.service';

@Module({
  imports: [ConfigModule],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
