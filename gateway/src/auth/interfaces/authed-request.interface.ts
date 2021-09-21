import { IUser } from '../../users/interfaces/user.interface';

export interface IAuthedRequest extends Request {
  user: IUser;
}
