import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksProvider } from './providers/tasks.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, tasksProvider],
})
export class TasksModule {}
