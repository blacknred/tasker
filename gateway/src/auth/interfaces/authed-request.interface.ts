import { IUser } from '../../users/interfaces/user.interface';

export type IAuthData = Pick<IUser, 'id' | 'roles'>;

export interface IAuthedRequest extends Request {
  user: IAuthData;
}
