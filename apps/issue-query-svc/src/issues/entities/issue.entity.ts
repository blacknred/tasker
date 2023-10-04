import {
  ArrayType,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {
  IIssue,
  IIssueRelation,
  IIssueStatus,
  IIssueTag,
  IssuePriority,
  IssueRelation,
  IssueType,
} from '@taskapp/shared';
import { v4 } from 'uuid';
import { Sprint } from '../../sprints/entities/sprint.entity';
import { User } from '../../users/entities';

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
export class Issue implements IIssue {
  @PrimaryKey()
  id: string = v4();

  @Index({ name: 'issue_type_idx' })
  @Enum({ items: () => IssueType, default: IssueType.TASK })
  type: IssueType = IssueType.TASK;

  @Index({ name: 'issue_project_id_idx' })
  @Property({ type: 'uuid' })
  projectId!: string;

  @Index({ name: 'issue_name_idx' })
  @Property({ unique: true, length: 10, check: 'length(name) >= 3' })
  name!: string;

  @Property({ length: 500, check: 'length(title) >= 5' })
  title!: string;

  @Enum({
    items: () => IssuePriority,
    default: IssuePriority.MEDIUM,
    nullable: true,
  })
  priority?: IssuePriority = IssuePriority.MEDIUM;

  @Property({ nullable: true, check: 'endsAt > current_date' })
  endsAt?: Date;

  @Property({ type: 'json', nullable: true })
  status!: IIssueStatus;

  @Property({ type: 'json', default: [] })
  tags!: IIssueTag[];

  @Property({ lazy: true, nullable: true })
  details?: string;

  @Property({
    lazy: true,
    type: ArrayType,
    default: [],
    check: 'image ~ "^(https?://.*.(?:png|gif|webp|jpeg|jpg))$"',
  })
  assets: string[] = [];

  @Property({ lazy: true, nullable: true, type: 'smallint' })
  version?: number;

  @Property({ lazy: true, nullable: true, type: 'smallint' })
  weight?: number;

  @Property({ lazy: true })
  endedAt: Date;

  @Index({ name: `issue_created_at_idx` })
  @Property({ lazy: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Property({ lazy: true, nullable: true, type: 'int' })
  votesCount: number;

  @Property({ lazy: true, nullable: true, type: 'int' })
  subscriptionsCount: number;

  @Index({ name: 'issue_sprint_id_idx' })
  @ManyToOne(() => Sprint, { lazy: true, fieldName: 'sprintId' })
  sprint?: Sprint;

  @Index({ name: 'issue_author_id_idx' })
  @ManyToOne(() => User, { lazy: true, fieldName: 'authorId' })
  author!: User;

  @Index({ name: 'issue_assignee_id_idx' })
  @ManyToOne(() => User, {
    nullable: true,
    fieldName: 'assigneeId',
  })
  assignee?: User;

  @ManyToOne(() => Issue, {
    nullable: true,
    fieldName: 'epicId',
  })
  epic?: Issue;

  @OneToMany({
    lazy: true,
    entity: () => Relation,
    mappedBy: 'issueId' || 'relatedIssue',
  })
  relations = new Collection<Relation>(this) as unknown as IIssueRelation[];

  constructor(instance?: Partial<Issue>) {
    Object.assign(this, instance);
  }
}
