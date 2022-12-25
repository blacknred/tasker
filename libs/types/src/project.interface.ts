import { IIssuePriority, IIssueTag } from './issue.interface';
import { IProjectRole } from './member.interface';

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

export interface IProject {
  id: number;
  authorId: number;
  type: ProjectType;
  key: string;
  name: string;
  details?: string;
  image?: string;
  isUnlimited: boolean;
  createdAt: string;
  updatedAt: string;
  //
  issuePriorities: IIssuePriority[];
  issueTags: IIssueTag[];
  boards: IProjectBoard[];
  workflow: IProjectWorkflow;
  roles: IProjectRole[];
}
