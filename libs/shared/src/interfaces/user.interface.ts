import type { IBase } from './base.interface';
import { IProjectRole } from './project-role.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export enum NotificationMethod {
  EMAIL = 'EMAIL',
  PUSH = 'PHONE',
  NONE = 'NONE',
}

export enum SecuredNotificationMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

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
  roles: IProjectRole[];
}

export type IUserPreview = Pick<IUser, 'id' | 'name' | 'image'>;
