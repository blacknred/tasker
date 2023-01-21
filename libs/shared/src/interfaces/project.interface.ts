import { ProjectType } from '../enums';
import type { IBase, ID } from './base.interface';
import type { ISprint } from './sprint.interface';

export interface IProject extends IBase {
  type: ProjectType;
  key: string;
  name: string;
  details?: string;
  image?: string;
  isUnlimited: boolean;
  authorId: ID;
  activeSprint: ISprint;
}

export type IProjectPreview = Pick<
  IProject,
  'id' | 'name' | 'image' | 'type' | 'authorId'
>;
