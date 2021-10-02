import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { tasksProvider } from './providers/tasks.provider';
import { TasksController } from './tasks.controller';

@Module({
  imports: [SharedModule],
  controllers: [TasksController],
  providers: [tasksProvider],
})
export class TasksModule {}
