import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { Task } from './entities/task.entity';
import { notificationProvider } from './providers/notification.provider';
import { workerProvider } from './providers/worker.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Task, Agent, Saga])],
  controllers: [TasksController],
  providers: [TasksService, workerProvider, notificationProvider],
})
export class TasksModule {}
