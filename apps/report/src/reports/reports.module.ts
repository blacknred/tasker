import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { Task } from './entities/report.entity';
import { notificationProvider } from '../../../sprint/src/sprints/providers/notification.provider';
import { workerProvider } from '../../../sprint/src/sprints/providers/worker.provider';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Task, Agent, Saga])],
  controllers: [ReportsController],
  providers: [ReportsService, workerProvider, notificationProvider],
})
export class ReportsModule {}
