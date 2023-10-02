import { IssuePriority, IssueRelation, IssueType } from '../enums';
import type { IBase, ID } from './base.interface';
import { ISprintPreview } from './sprint.interface';
import { IUserPreview } from './user.interface';

export interface IIssueStatus {
  name: string;
  color?: string;
  isFirst: boolean;
  isLast: boolean;
  transitions: string[];
}

export interface IIssueTag {
  name: string;
  color?: string;
}

export interface IIssueRelation {
  issueId: ID;
  relatedIssue: IIssuePreview;
  relation: IssueRelation;
  comment?: string;
}

export interface IIssue extends IBase {
  projectId: ID;
  type: IssueType;
  name: string;
  title: string;
  details?: string;
  priority?: IssuePriority;
  assets: string[];
  version?: number;
  weight?: number;
  endsAt?: string | Date;
  endedAt?: string | Date;
  votesCount: number;
  subscriptionsCount: number;
  status: IIssueStatus;
  tags: IIssueTag[];
  author: IUserPreview;
  sprint?: ISprintPreview;
  assignee?: IUserPreview;
  epic?: IIssuePreview;
  relations: IIssueRelation[];
}

export type IIssuePreview = Pick<
  IIssue,
  | 'id'
  | 'type'
  | 'projectId'
  | 'name'
  | 'title'
  | 'status'
  | 'priority'
  | 'endsAt'
  | 'tags'
  | 'assignee'
  | 'epic'
>;

export type IIssueSubscription = {
  issue?: IIssuePreview;
  user?: IUserPreview;
};

export type IIssueVote = {
  issue?: IIssuePreview;
  user?: IUserPreview;
};

export interface IIssueComment extends IBase {
  issueId: ID;
  body: string;
  assets: string[];
  author: IUserPreview;
}
