import { IUser } from 'src/users/interfaces/user.interface';
export interface IAuthRequest extends Request {
  user?: IUser;
}
