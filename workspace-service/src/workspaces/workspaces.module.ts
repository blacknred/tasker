import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbProvider } from './providers/db.provider';
import { workerProvider } from './providers/worker.provider';
import { taskRepositoryProvider } from './providers/task.provider';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [ConfigModule],
  controllers: [WorkspacesController],
  providers: [
    WorkspacesService,
    workerProvider,
    dbProvider,
    taskRepositoryProvider,
  ],
})
export class WorkspacesModule {}
