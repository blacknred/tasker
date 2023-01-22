import type { IBase, ID } from './base.interface';

export interface ISprint extends IBase {
  projectId: ID;
  name: string;
  details?: string;
  startsAt: string | Date;
  endsAt: string | Date;
  authorId: ID;
}

export type IHydratedSprint = ISprint;
