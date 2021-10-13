import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbProvider } from './providers/db.provider';
import { workerProvider } from './providers/worker.provider';
import { taskProvider } from './providers/task.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { notificationProvider } from './providers/notification.provider';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    dbProvider,
    taskProvider,
    workerProvider,
    notificationProvider,
  ],
})
export class TasksModule {}
