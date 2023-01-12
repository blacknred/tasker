import { IRole } from './role.interface';
import { IUser } from './user.interface';

export interface ITeammate {
  isActive: boolean;
  createdAt: string;
  //
  role: IRole;
  user: IUser;
}
