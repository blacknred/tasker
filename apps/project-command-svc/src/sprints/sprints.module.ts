import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { getNotificationClientOptions } from '@taskapp/shared/providers/notification.provider';
import {
  CreateSprintHandler,
  DeleteSprintHandler,
  UpdateSprintHandler,
} from './commands';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([getNotificationClientOptions()]),
  ],
  controllers: [SprintsController],
  providers: [
    EventRepository,
    CreateSprintHandler,
    UpdateSprintHandler,
    DeleteSprintHandler,
  ],
})
export class SprintsModule {}
