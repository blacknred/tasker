import { Module } from '@nestjs/common';
import { tasksProvider } from './providers/tasks.provider';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [tasksProvider],
})
export class TasksModule {}
