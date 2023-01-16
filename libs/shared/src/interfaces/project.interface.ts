import { ProjectType } from '../enums';
import type { IBase } from './base.interface';
import type { ISprintPreview } from './sprint.interface';
import type { IUserPreview } from './user.interface';

export interface IProject extends IBase {
  type: ProjectType;
  key: string;
  name: string;
  details?: string;
  image?: string;
  isUnlimited: boolean;
  //
  author: IUserPreview;
  activeSprint: ISprintPreview;
}

export type IProjectPreview = Pick<
  IProject,
  'id' | 'name' | 'image' | 'type' | 'author'
>;
