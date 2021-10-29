import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbProviders from './providers/db.providers';
import { workerProvider } from './providers/worker.provider';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [ConfigModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService, workerProvider, ...dbProviders],
})
export class WorkspacesModule {}
