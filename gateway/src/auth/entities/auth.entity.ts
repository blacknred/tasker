import { IUser } from 'src/users/interfaces/user.interface';
import { IAuth, IPushSubscription } from '../interfaces/auth.interface';

export class Auth implements IAuth {
  user: Partial<IUser>;
  pushSubscriptions: IPushSubscription[];

  // constructor(user?: Partial<User>) {
  //   Object.assign(this, user);
  // }
}
