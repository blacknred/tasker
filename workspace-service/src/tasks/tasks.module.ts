import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { notificationProvider } from './providers/notification.provider';
import { repositoryProvider } from './providers/repository.provider';
import { workerProvider } from './providers/worker.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    repositoryProvider,
    workerProvider,
    notificationProvider,
  ],
})
export class TasksModule {}
