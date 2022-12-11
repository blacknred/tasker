import { Module } from '@nestjs/common';
import { workspaceProvider } from './providers/workspace.provider';
import { WorkspacesController } from './workspaces.controller';

@Module({
  controllers: [WorkspacesController],
  providers: [workspaceProvider],
})
export class WorkspacesModule {}
