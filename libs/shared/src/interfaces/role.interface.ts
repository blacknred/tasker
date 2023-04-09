import { ProjectPermission } from '../enums';
import type { IBase, ID } from './base.interface';

export interface IRole extends IBase {
  projectId: ID;
  name: string;
  color?: string;
  permissions: ProjectPermission[];
}

export type IHydratedRole = IRole;
