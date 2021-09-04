import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksProvider } from './tasks.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, tasksProvider]
})
export class TasksModule {}
