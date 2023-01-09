import { IBase, ID } from './base.interface';
import { ISprintPreview } from './sprint.interface';
import { IUserPreview } from './user.interface';

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

export interface IIssueTag {
  id: ID;
  projectId: ID;
  name: string;
  color?: string;
}

export interface IIssueStatus {
  id: ID;
  projectId: ID;
  name: string;
  color?: string;
  isFirst: boolean;
  isLast: boolean;
  //
  transitions: IIssueStatus[];
}

export interface IProjectBoard {
  id: ID;
  projectId: ID;
  name: string;
  colls: IProjectBoardColumn[];
}

interface IProjectBoardColumn {
  order: number;
  //
  status: IIssueStatus;
}

export interface IIssueLike {
  user: IUserPreview;
  issue: IIssuePreview;
}

export interface IIssueSubscription {
  user: IUserPreview;
  issue: IIssuePreview;
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
  createdAt: string;
  field: string;
  prev: string;
  next: string;
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
  status: IIssueStatus;
  priority: IssuePriority;
  startedAt: string;
  endedAt: string;
  //
  version?: number;
  weight?: number;
  tags: IIssueTag[];
  author: IUserPreview;
  assignee?: IUserPreview;
  epic?: IIssuePreview;
  sprint?: ISprintPreview;
  relations: IIssueRelation[];
  comments: IIssueComment[];
  subscribers: IIssueSubscription[];
  likes: IIssueLike[];
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
  | 'likes'
>;
