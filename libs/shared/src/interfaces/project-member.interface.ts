import { IProjectRole } from './project-role.interface';
import { IUser } from './user.interface';

export interface IProjectMember {
  isActive: boolean;
  createdAt: string;
  //
  role: IProjectRole;
  user: IUser;
}
