import { IBase } from './base.interface';
import { IProfile } from './user.interface';

export interface ISprint extends IBase {
  projectId: number;
  name: string;
  startsAt: string;
  endsAt: string;
  //
  author: IProfile;
}

export type ISprintPreview = Pick<ISprint, 'id' | 'name'>;
