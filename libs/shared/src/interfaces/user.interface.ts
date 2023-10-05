import type { IBase, ID } from './base.interface';
import { IProjectPreview } from './project.interface';
import type { IRole } from './role.interface';

export interface IFilter {
  name: string;
  url: string;
}

export interface IUser extends IBase {
  workspaceId: ID;
  isActive?: boolean;
  username: string;
  image?: string;
  details?: string;
  phone?: string;
  locale: string;
  firstName: string;
  lastName: string;
  email: string;
  filters?: IFilter[];
  roles: IRole[];
  projects: IProjectPreview[];
}

export type IUserPreview = Pick<IUser, 'id' | 'username' | 'image'>;
