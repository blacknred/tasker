import { IBase } from './base.interface';
import { IUserPreview } from './user.interface';

export enum ProjectType {
  SCRUM = 'SCRUM',
  CANBAN = 'CANBAN',
}

export interface IProject extends IBase {
  type: ProjectType;
  key: string;
  name: string;
  details?: string;
  image?: string;
  isUnlimited: boolean;
  //
  author: IUserPreview;
}

export type IProjectPreview = Pick<
  IProject,
  'id' | 'name' | 'image' | 'type' | 'author'
>;
