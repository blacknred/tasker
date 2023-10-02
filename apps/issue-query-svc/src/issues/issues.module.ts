import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Issue, User } from './entities';
import {
  IssueCreatedHandler,
  IssueDeletedHandler,
  IssueUpdatedHandler,
} from './events';
import { IssuesController } from './issues.controller';
import { GetIssueHandler, GetIssuesHandler } from './queries';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Issue, User])],
  controllers: [IssuesController],
  providers: [
    GetIssueHandler,
    GetIssuesHandler,
    IssueCreatedHandler,
    IssueUpdatedHandler,
    IssueDeletedHandler,
  ],
})
export class IssuesModule {}
