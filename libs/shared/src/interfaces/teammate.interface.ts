import type { IRole } from './role.interface';
import type { IExtendedProfile } from './account.interface';
import type { ID } from './base.interface';

export interface ITeammate {
  isActive?: boolean;
  createdAt: string | Date;
  userId: ID;
  roleId: ID;
}

export interface IHydratedTeammate
  extends Omit<ITeammate, 'userId' | 'roleId'> {
  user: IExtendedProfile;
  role: IRole;
}
