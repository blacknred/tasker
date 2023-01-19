import type { IRole } from './role.interface';
import type { IUser } from './user.interface';

export interface ITeammate {
  isActive: boolean;
  createdAt: string | Date;
  //
  role: IRole;
  user: IUser;
}
