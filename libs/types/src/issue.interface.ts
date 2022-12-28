import { IBase } from './base.interface';
import { ISprintPreview } from './sprint.interface';
import { IProfile } from './user.interface';

export enum IssueType {
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
}

export enum IssueRelation {
  RELATE = 'RELATE',
  BLOCK = 'BLOCK',
  DUPLICATE = 'DUPLICATE',
  CAUSE = 'CAUSE',
}

export interface IIssuePriority {
  name: string;
  color?: string;
}

export interface IIssueTag {
  name: string;
  color?: string;
}

export interface IIssueComment extends IBase {
  issueId: number;
  body: string;
  assets: string[];
  //
  author: IProfile;
}

export interface IIssueFavorite {
  user: IProfile;
  issue: IIssuePreview;
}

export interface IIssueWatcher {
  user: IProfile;
  issue: IIssuePreview;
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
  user: IProfile;
}

export interface IIssue extends IBase {
  type: IssueType;
  projectId: number;
  name: string;
  title: string;
  details?: string;
  assets: string[];
  updates: IIssueUpdate[];
  status: string;
  startedAt: string;
  endedAt: string;
  //
  version?: number;
  weight?: number;
  priority: IIssuePriority;
  tags: IIssueTag[];
  author: IProfile;
  assignee?: IProfile;
  epic?: IIssuePreview;
  sprint?: ISprintPreview;
  relations: IIssueRelation[];
  comments: IIssueComment[];
}

export type IIssuePreview = Pick<IIssue, 'id' | 'name' | 'title'>;
