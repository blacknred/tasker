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
}

export interface IHydratedProject extends IProject {
  activeSprint: ISprint;
}
