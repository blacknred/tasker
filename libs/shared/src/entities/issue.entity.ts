import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { AggregateRoot } from '@nestjs/cqrs';
import { IssuePriority, IssueRelation, IssueType } from '../enums';
import type {
  IIssue,
  IIssueComment,
  IIssueRelation,
  IIssueUpdate,
  ITag,
  IUserPreview,
} from '../interfaces';
import { Status } from './status.entity';
import { User } from './user.entity';
import { v4 } from 'uuid';
import { Sprint } from './sprint.entity';
import { Tag } from './tag.entity';

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

@Entity({ tableName: 'issue_relation' })
export class Relation implements IIssueRelation {
  @Enum({ items: () => IssueRelation, default: IssueRelation.CAUSE })
  relation: IssueRelation = IssueRelation.CAUSE;

  @Property({ nullable: true })
  comment?: string;

  @Property({ type: 'uuid' })
  issueId!: string;

  @ManyToOne(() => Issue, { fieldName: 'relatedIssueId' })
  relatedIssue!: Issue;
}

@Entity({ tableName: 'issue' })
export class Issue extends AggregateRoot implements IIssue {
  @PrimaryKey()
  id: string = v4();

  @Index({ name: 'issue_project_id_idx' })
  @Property({ type: 'uuid' })
  projectId!: string;

  @Index({ name: 'issue_name_idx' })
  @Property({ unique: true, length: 10, check: 'length(name) >= 3' })
  name!: string;

  @Property({ length: 500, check: 'length(title) >= 5' })
  title!: string;

  @Index({ type: 'fulltext' })
  @Property({ type: FullTextType, onUpdate: (issue: Issue) => issue.title })
  searchTitle!: string;

  @Property({ lazy: true, nullable: true })
  details?: string;

  @Index({ name: 'issue_type_idx' })
  @Enum({ items: () => IssueType, default: IssueType.TASK })
  type: IssueType = IssueType.TASK;

  @Enum({
    items: () => IssuePriority,
    default: IssuePriority.MEDIUM,
    nullable: true,
  })
  priority?: IssuePriority = IssuePriority.MEDIUM;

  @Property({ lazy: true, type: ArrayType, default: [] })
  assets: string[] = [];

  @Property({ nullable: true, type: 'smallint' })
  version?: number;

  @Property({ lazy: true, nullable: true, type: 'smallint' })
  weight?: number;

  @Property({ nullable: true, check: 'endsAt > current_date' })
  endsAt?: Date;

  @Property({ lazy: true })
  endedAt: Date;

  @Index({ name: `issue_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Property({ lazy: true, type: 'json', default: [] })
  updates: IIssueUpdate[] = [];

  //

  @Index({ name: 'issue_author_id_idx' })
  @ManyToOne(() => User, { lazy: true, fieldName: 'authorId' })
  author!: User;

  @Index({ name: 'issue_assignee_id_idx' })
  @ManyToOne(() => User, {
    nullable: true,
    fieldName: 'assigneeId',
  })
  assignee?: User;

  @Index({ name: 'issue_status_id_idx' })
  @ManyToOne(() => Status, { fieldName: 'statusId' })
  status!: Status;

  @Index({ name: 'issue_sprint_id_idx' })
  @ManyToOne(() => Sprint, {
    lazy: true,
    nullable: true,
    fieldName: 'sprintId',
  })
  sprint?: Sprint;

  @ManyToOne(() => Issue, {
    nullable: true,
    fieldName: 'epicId',
  })
  epic?: Issue;

  @ManyToMany({ entity: () => Tag, pivotTable: 'issue_tag' })
  tags = new Collection<Tag>(this) as unknown as ITag[];

  @ManyToMany({ lazy: true, entity: () => User, pivotTable: 'issue_vote' })
  voters = new Collection<User>(this) as unknown as IUserPreview[];

  @ManyToMany({
    lazy: true,
    entity: () => User,
    pivotTable: 'issue_subscription',
  })
  subscribers = new Collection<User>(this) as unknown as IUserPreview[];

  @OneToMany({ lazy: true, entity: () => Comment, mappedBy: 'issueId' })
  comments = new Collection<Comment>(this) as unknown as IIssueComment[];

  @OneToMany({
    lazy: true,
    entity: () => Relation,
    mappedBy: 'issueId' || 'relatedIssue',
  })
  relations = new Collection<Relation>(this) as unknown as IIssueRelation[];

  //

  constructor(instance?: Partial<Issue>) {
    super();
    Object.assign(this, instance);
  }

  // killEnemy(enemyId: string) {
  //   // logic
  //   this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  // }
}
