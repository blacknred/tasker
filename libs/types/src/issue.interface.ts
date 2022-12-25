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

export interface IIssueComment {
  id: number;
  authorId: number;
  issueId: number;
  body: string;
  assets: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IIssueFavorite {
  userId: number;
  issueId: number;
}

export interface IIssueWatcher {
  userId: number;
  issueId: number;
}

export interface IIssueRelation {
  issueId: number;
  relatedIssueId: number;
  relation: IssueRelation;
  comment?: string;
}

export interface IIssueUpdate {
  userId: number;
  createdAt: string;
  field: string;
  prev: string;
  next: string;
}

export interface IIssue {
  id: number;
  type: IssueType;
  authorId: number;
  projectId: number;
  assigneeId?: number;
  epicId?: number;
  sprintId?: number;
  name: string;
  title: string;
  details?: string;
  assets: string[];
  updates: IIssueUpdate[];
  status: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  endedAt: string;
  //
  version?: number;
  weight?: number;
  priority: IIssuePriority;
  tags: IIssueTag[];
}
