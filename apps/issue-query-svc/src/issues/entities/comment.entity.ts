import {
  ArrayType,
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { IIssueComment } from '@taskapp/shared';
import { v4 } from 'uuid';
import { User } from './user.entity';

@Entity({ tableName: 'issue_comment' })
export class Comment implements IIssueComment {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  issueId!: string;

  @Property({ check: 'length(comment) >= 1' })
  body!: string;

  @Property({ type: ArrayType, default: [] })
  assets: string[] = [];

  @Index({ name: `comment_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @ManyToOne(() => User, { fieldName: 'authorId' })
  author!: User;
}
