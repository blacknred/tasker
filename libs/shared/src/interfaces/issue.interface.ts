import { IssueRelation, IssueType, Priority } from '../enums';
import type { IProfile } from './account.interface';
import type { IBase, ID } from './base.interface';
import type { IStatus } from './status.interface';
import type { ITag } from './tag.interface';

export interface IComment extends IBase {
  issueId: ID;
  body: string;
  assets: string[];
  authorId: ID;
}

export interface IHydratedComment extends Omit<IComment, 'authorId'> {
  author: IProfile;
}

export interface IIssueRelation {
  relation: IssueRelation;
  comment?: string;
  issueId: ID;
}

export interface IHydratedIssueRelation extends IIssueRelation {
  relatedIssueId: IHydratedIssueBase;
}

export interface IIssue extends IBase {
  type: IssueType;
  projectId: ID;
  name: string;
  title: string;
  statusId: ID;
  priority?: Priority;
  endsAt?: string | Date;
  weight?: number;
  tags: ID[];
  assigneeId?: ID;
  epicId?: ID;
  //
  sprintId?: ID;
  details?: string;
  endedAt: string | Date;
  assets: string[];
  version?: number;
  authorId: ID;
  relations: IIssueRelation[];
}

export interface IHydratedIssue
  extends Omit<IIssue, 'statusId' | 'tags' | 'relations'> {
  status: IStatus;
  tags: ITag[];
  assignee?: IProfile;
  epic?: IHydratedIssueBase;
  author: IProfile; //lazy
  relations: IHydratedIssueRelation[]; //lazy

  comments: IHydratedComment[]; //lazy
  subscribers: IProfile[]; //lazy
  voters: IProfile[]; //lazy
  // updates?: IHydratedIssueUpdate[];
}

export type IHydratedIssueBase = Pick<
  IHydratedIssue,
  | 'id'
  | 'type'
  | 'projectId'
  | 'name'
  | 'title'
  | 'status'
  | 'priority'
  | 'endsAt'
  | 'weight'
  | 'tags'
  | 'assignee'
  | 'epic'
>;

// export interface IHydratedIssueUpdate {
//   field: string;
//   prev: string;
//   next: string;
//   createdAt: string | Date;
//   user: IProfile;
// }
