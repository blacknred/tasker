import type { IBase, ID } from './base.interface';
import type { IRole } from './role.interface';

export interface IFilter {
  name: string;
  schema: string;
}

export interface IUser extends IBase {
  workspaceId: ID;
  projectId: ID;
  isActive?: boolean;
  username: string;
  image?: string;
  details?: string;
  phone?: string;
  locale: string;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  filters: IFilter[];
  roles: IRole[];
}

export type IUserPreview = Pick<IUser, 'id' | 'username' | 'image'>;
