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
  issueId: ID;
  relatedIssue: IIssuePreview;
}

export interface IIssueUpdate {
  field: string;
  prev: string;
  next: string;
  createdAt: string | Date;
  //
  user: IUserPreview;
}

export interface IIssue extends IBase {
  type: IssueType;
  projectId: ID;
  name: string;
  title: string;
  details?: string;
  assets: string[];
  updates: IIssueUpdate[];
  status: IStatus;
  priority?: IssuePriority;
  endsAt?: string | Date;
  endedAt: string | Date;
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
