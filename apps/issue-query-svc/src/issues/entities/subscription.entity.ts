import { Entity, ManyToOne } from '@mikro-orm/core';
import { IIssueSubscription } from '@taskapp/shared';
import { Issue } from './issue.entity';
import { User } from './user.entity';

@Entity({ tableName: 'issue_subscription' })
export class Subscription implements IIssueSubscription {
  @ManyToOne(() => User, { fieldName: 'userId' })
  user: User;

  @ManyToOne(() => Issue, {
    nullable: true,
    fieldName: 'issueId',
  })
  issue: Issue;
}
