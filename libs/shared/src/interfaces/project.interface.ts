import { ProjectType } from '../enums';
import type { IBase, ID } from './base.interface';
import { IIssueStatus, IIssueTag } from './issue.interface';

export interface IProject extends IBase {
  workspaceId: ID;
  name: string;
  details?: string;
  type: ProjectType;
  key: string;
  image?: string;
  authorId: ID;
  statusses: IIssueStatus[];
  tags: IIssueTag[];
}

export type IProjectPreview = Pick<IProject, 'id' | 'name' | 'image'>;
