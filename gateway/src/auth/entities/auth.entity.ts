import { IAuth, IPushSubscription } from '../interfaces/auth.interface';

export class Auth implements IAuth {
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: null;
  };
  pushSubscriptions: IPushSubscription[];
}
