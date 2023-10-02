import { Entity, ManyToOne } from '@mikro-orm/core';
import { IIssueVote } from '@taskapp/shared';
import { User } from './user.entity';
import { Issue } from './issue.entity';

@Entity({ tableName: 'issue_vote' })
export class Vote implements IIssueVote {
  @ManyToOne(() => User, { fieldName: 'userId' })
  user: User;

  @ManyToOne(() => Issue, {
    nullable: true,
    fieldName: 'issueId',
  })
  issue: Issue;
}
