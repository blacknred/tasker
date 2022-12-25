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

export interface IUser extends IProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  extraNotificationMethod: ExtraNotificationMethod;
  locale: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
