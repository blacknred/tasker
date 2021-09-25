import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { tasksProvider } from './providers/tasks.provider';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [AppService, tasksProvider],
})
export class TasksModule {}
