import type { IProfile } from './account.interface';
import type { ID } from './base.interface';
import type { IRole } from './role.interface';

export interface IMember {
  isActive?: boolean;
  createdAt: string | Date;
  accountId: ID;
  roleId: ID;
}

export interface IHydratedMember extends Omit<IMember, 'accountId' | 'roleId'> {
  profile: IProfile;
  role: IRole;
}
