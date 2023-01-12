import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { BaseEntity } from '@taskapp/service-core';
import {
  IIssue,
  IIssueComment,
  IIssueRelation,
  IIssueUpdate,
  IssuePriority,
  IssueRelation,
  IssueType,
} from '@taskapp/shared';
import { Sprint } from '../../sprints/entities/sprint.entity';
import { Status } from '../../statuses/entities/status.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'issue_comment' })
export class Comment extends BaseEntity<Comment> implements IIssueComment {
  @Property({ type: 'uuid' })
  issueId!: string;

  @Property({ check: 'length(comment) >= 1' })
  body!: string;

  @Property({ type: ArrayType, default: [] })
  assets: string[] = [];

  @ManyToOne(() => User, { fieldName: 'authorId' })
  author!: User;
}

@Entity({ tableName: 'issue_relation' })
export class Relation implements IIssueRelation {
  @Enum({ items: () => IssueRelation, default: IssueRelation.CAUSE })
  relation: IssueType = IssueRelation.CAUSE;

  @Property({ nullable: true })
  comment?: string;

  @ManyToOne(() => Issue, { fieldName: 'issueId' })
  issue!: Issue;

  @ManyToOne(() => Issue, { fieldName: 'relatedIssueId' })
  relatedIssue!: Issue;
}

@Entity({ tableName: 'issue' })
export class Issue extends BaseEntity<Issue> implements IIssue {
  @Index({ name: 'issue_project_id_idx' })
  @Property({ type: 'uuid' })
  projectId!: string;

  @Index({ name: 'issue_name_idx' })
  @Property({ unique: true, length: 10, check: 'length(name) >= 3' })
  name!: string;

  @Property({ length: 500, check: 'length(title) >= 5' })
  title!: string;

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

  @Property({ lazy: true, nullable: true })
  endedAt?: Date;

  @Index({ type: 'fulltext' })
  @Property({ type: FullTextType, onUpdate: (issue: Issue) => issue.title })
  searchTitle!: string;

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
  tags = new Collection<Tag>(this);

  @ManyToMany({ lazy: true, entity: () => User, pivotTable: 'issue_vote' })
  voters = new Collection<User>(this);

  @ManyToMany({
    lazy: true,
    entity: () => User,
    pivotTable: 'issue_subscription',
  })
  subscribers = new Collection<User>(this);

  @OneToMany({ lazy: true, entity: () => Comment, mappedBy: 'issueId' })
  comments = new Collection<Comment>(this);

  @OneToMany({
    lazy: true,
    entity: () => Relation,
    mappedBy: 'issue' || 'relatedIssue',
  })
  relations = new Collection<Relation>(this);
}
