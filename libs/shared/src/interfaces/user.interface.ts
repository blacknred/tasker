import { NotificationMethod, SecuredNotificationMethod } from '../enums';
import type { IBase } from './base.interface';
import type { IRole } from './role.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export interface IUser extends IBase {
  username: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  details?: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  locale: string;
  currency: string;
  is2faEnabled: boolean;
  notificationMethod: NotificationMethod;
  securedNotificationMethod: SecuredNotificationMethod;
  //
  roles: IRole[];
}

export type IUserPreview = Pick<IUser, 'id' | 'name' | 'image'>;
