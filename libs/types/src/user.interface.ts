import { IBase } from './base.interface';
import { ExtraNotificationMethod } from './notification.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export interface IProfile {
  username: string;
  image?: string;
  bio?: string;
  userId: number;
}

export interface IUser extends IBase {
  email: string;
  phone?: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  extraNotificationMethod: ExtraNotificationMethod;
  locale: string;
  currency: string;
  //
  profile: IProfile;
}
