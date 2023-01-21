import { IssuePriority, IssueRelation, IssueType } from '../enums';
import type { IProfile } from './account.interface';
import type { IBase, ID } from './base.interface';
import type { IStatus } from './status.interface';
import type { ITag } from './tag.interface';

export interface IIssueComment extends IBase {
  issueId: ID;
  body: string;
  assets: string[];
  author: IProfile;
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
  user: IProfile;
}

export interface IIssue extends IBase {
  type: IssueType;
  projectId: ID;
  sprintId?: ID;
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
  author: IProfile;
  assignee?: IProfile;
  epic?: IIssuePreview;
  relations: IIssueRelation[];
  comments: IIssueComment[];
  subscribers: IProfile[];
  voters: IProfile[];
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
  | 'weight'
  | 'endsAt'
>;
