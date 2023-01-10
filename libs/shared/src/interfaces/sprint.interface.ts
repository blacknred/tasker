import type { IBase, ID } from './base.interface';
import type { IUserPreview } from './user.interface';

export interface ISprint extends IBase {
  projectId: ID;
  name: string;
  details?: string;
  startsAt: string;
  endsAt: string;
  //
  author: IUserPreview;
}

export type ISprintPreview = Pick<ISprint, 'id' | 'name'>;
