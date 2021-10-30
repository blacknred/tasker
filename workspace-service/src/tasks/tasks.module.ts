import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { notificationProvider } from './providers/notification.provider';
import { taskRepositoryProvider } from './providers/task-repository.provider';
import { workerProvider } from './providers/worker.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    taskRepositoryProvider,
    workerProvider,
    notificationProvider,
  ],
})
export class TasksModule {}
