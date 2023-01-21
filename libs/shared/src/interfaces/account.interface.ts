import { NotificationMethod, SecuredNotificationMethod } from '../enums';
import type { IBase } from './base.interface';
import type { ITeammate } from './teammate.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export interface IAccount extends IBase {
  username: string;
  name: string;
  image?: string;
  details?: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  locale: string;
  currency: string;
  is2faEnabled: boolean;
  notificationMethod: NotificationMethod;
  securedNotificationMethod: SecuredNotificationMethod;
  projects: ITeammate[];
}

export interface IProfile
  extends Pick<IAccount, 'username' | 'name' | 'image'> {
  userId: IAccount['id'];
}

export type IExtendedProfile = IProfile & IAccount['details'];
