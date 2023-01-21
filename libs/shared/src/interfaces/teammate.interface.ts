import type { IRole } from './role.interface';
import type { IExtendedProfile } from './account.interface';

export interface ITeammate {
  isActive?: boolean;
  createdAt: string | Date;
  user: IExtendedProfile;
  role: IRole;
}
