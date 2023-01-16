import type { IRole } from './role.interface';
import type { IUser } from './user.interface';

export interface ITeammate {
  isActive: boolean;
  createdAt: string;
  //
  role: IRole;
  user: IUser;
}
