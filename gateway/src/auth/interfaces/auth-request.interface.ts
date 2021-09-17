import { IUser } from '../../users/interfaces/user.interface';

export interface IAuthRequest extends Request {
  user?: IUser;
}
