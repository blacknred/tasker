import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { getNotificationClientOptions } from '@taskapp/shared/providers/notification.provider';
import {
  CreateCommentHandler,
  CreateIssueHandler,
  CreateSubscriptionHandler,
  CreateVoteHandler,
  DeleteCommentHandler,
  DeleteIssueHandler,
  DeleteSubscriptionHandler,
  DeleteVoteHandler,
  UpdateCommentHandler,
  UpdateIssueHandler,
} from './commands';
import { IssuesController } from './issues.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([getNotificationClientOptions()]),
  ],
  controllers: [IssuesController],
  providers: [
    EventRepository,
    CreateIssueHandler,
    UpdateIssueHandler,
    DeleteIssueHandler,
    CreateCommentHandler,
    UpdateCommentHandler,
    DeleteCommentHandler,
    CreateSubscriptionHandler,
    DeleteSubscriptionHandler,
    CreateVoteHandler,
    DeleteVoteHandler,
  ],
})
export class IssuesModule {}
