import { IBase } from './base.interface';
import { IIssuePriority, IIssueTag } from './issue.interface';
import { IProjectRole } from './member.interface';
import { IProfile } from './user.interface';

export enum ProjectType {
  SCRUM = 'SCRUM',
  CANBAN = 'CANBAN',
}

export interface IProjectBoard {
  projectId: number;
  name: string;
  cols: string[];
}

export interface IProjectWorkflow {
  projectId: number;
  name: string;
  color?: string;
  transitions: string[];
  isFirst: boolean;
  isLast: boolean;
}

export interface IProject extends IBase {
  type: ProjectType;
  key: string;
  name: string;
  details?: string;
  image?: string;
  isUnlimited: boolean;
  //
  workflow: IProjectWorkflow;
  boards: IProjectBoard[];
  roles: IProjectRole[];
  issuePriorities: IIssuePriority[];
  issueTags: IIssueTag[];
  author: IProfile;
}

export type IProjectPreview = Pick<IProject, 'id' | 'name' | 'image' | 'type'>;
