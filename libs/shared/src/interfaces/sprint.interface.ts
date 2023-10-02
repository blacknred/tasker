import type { IBase, ID } from './base.interface';
import { IUserPreview } from './user.interface';

export interface ISprint extends IBase {
  projectId: ID;
  name: string;
  details?: string;
  startsAt: string | Date;
  endsAt: string | Date;
  author: IUserPreview;
}

export type ISprintPreview = Pick<ISprint, 'id' | 'name'>;
