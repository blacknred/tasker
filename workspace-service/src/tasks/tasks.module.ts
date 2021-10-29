import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbProvider } from './providers/db.provider';
import { workerProvider } from './providers/worker.provider';
import { taskRepositoryProvider } from './providers/task.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [TasksService, workerProvider, dbProvider, taskRepositoryProvider],
})
export class TasksModule {}
