import type { IBase, ID } from './base.interface';
import type { ISprintPreview } from './sprint.interface';
import { IStatus } from './status.interface';
import { ITag } from './tag.interface';
import type { IUserPreview } from './user.interface';

export enum IssueType {
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
}

export enum IssuePriority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
}

export enum IssueRelation {
  RELATE = 'RELATE',
  BLOCK = 'BLOCK',
  DUPLICATE = 'DUPLICATE',
  CAUSE = 'CAUSE',
}

export interface IIssueComment extends IBase {
  issueId: ID;
  body: string;
  assets: string[];
  //
  author: IUserPreview;
}

export interface IIssueRelation {
  relation: IssueRelation;
  comment?: string;
  //
  issue: IIssuePreview;
  subIssueId: IIssuePreview;
}

export interface IIssueUpdate {
  field: string;
  prev: string;
  next: string;
  createdAt: string;
  //
  user: IUserPreview;
}

export interface IIssue extends IBase {
  type: IssueType;
  projectId: number;
  name: string;
  title: string;
  details?: string;
  assets: string[];
  updates: IIssueUpdate[];
  status: IStatus;
  priority: IssuePriority;
  startedAt: string;
  endedAt: string;
  //
  version?: number;
  weight?: number;
  tags: ITag[];
  author: IUserPreview;
  assignee?: IUserPreview;
  epic?: IIssuePreview;
  sprint?: ISprintPreview;
  relations: IIssueRelation[];
  comments: IIssueComment[];
  subscribers: IUserPreview[];
  voters: IUserPreview[];
}

export type IIssuePreview = Pick<
  IIssue,
  | 'id'
  | 'name'
  | 'title'
  | 'assignee'
  | 'projectId'
  | 'status'
  | 'type'
  | 'tags'
  | 'voters'
>;
