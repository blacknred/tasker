import { IssuePriority, IssueRelation, IssueType } from '../enums';
import type { IBase, ID } from './base.interface';
import type { ISprintPreview } from './sprint.interface';
import type { IStatus } from './status.interface';
import type { ITag } from './tag.interface';
import type { IUserPreview } from './user.interface';

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
