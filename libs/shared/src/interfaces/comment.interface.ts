import type { IProfile } from './account.interface';
import type { IBase, ID } from './base.interface';

export interface IComment extends IBase {
  issueId: ID;
  body: string;
  assets: string[];
  authorId: ID;
}

export interface IHydratedComment extends Omit<IComment, 'authorId'> {
  author: IProfile;
}
