import { IUser } from '../../users/interfaces/user.interface';

export interface IPushSubscription {
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export type IAuth = Pick<IUser, 'id' | 'roles' | 'email'> & {
  pushSubscriptions?: IPushSubscription[];
};
