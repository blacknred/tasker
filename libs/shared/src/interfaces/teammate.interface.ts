import type { IProfile } from './account.interface';
import type { ID } from './base.interface';
import type { IRole } from './role.interface';

export interface ITeammate {
  isActive?: boolean;
  createdAt: string | Date;
  accountId: ID;
  roleId: ID;
}

export interface IHydratedTeammate
  extends Omit<ITeammate, 'accountId' | 'roleId'> {
  profile: IProfile;
  role: IRole;
}
