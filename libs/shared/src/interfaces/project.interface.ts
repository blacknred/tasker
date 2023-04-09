import { ProjectType } from '../enums';
import type { IBase, ID } from './base.interface';
import type { IHydratedSprint } from './sprint.interface';

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
  activeSprint: IHydratedSprint;
}

export type IHydratedProjectPreview = Pick<IProject, 'id' | 'name'>;
