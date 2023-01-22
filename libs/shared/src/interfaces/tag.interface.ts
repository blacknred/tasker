import type { ID } from './base.interface';

export interface ITag {
  id: ID;
  projectId: ID;
  name: string;
  color?: string;
}

export type IHydratedTag = ITag;
