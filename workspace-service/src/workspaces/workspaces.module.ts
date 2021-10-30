import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { workspaceRepositoryProvider } from './providers/workspace-repository.provider';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [ConfigModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService, workspaceRepositoryProvider],
})
export class WorkspacesModule {}
