import type { IBase, ID } from './base.interface';
import { IProjectPreview } from './project.interface';

export interface IWorkspace extends IBase {
  name: string;
  details?: string;
  ownerId: ID;
  totp: boolean;
  isUnlimited: boolean;
  deletedAt?: string | Date;
  projects: IProjectPreview[];
}
