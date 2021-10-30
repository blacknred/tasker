import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { repositoryProvider } from './providers/repository.provider';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [ConfigModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService, repositoryProvider],
})
export class WorkspacesModule {}
