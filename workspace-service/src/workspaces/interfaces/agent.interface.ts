import { ObjectID } from 'typeorm';
import { IRole } from './role.interface';

export interface IAgent {
  id: ObjectID;
  userId: number;
  userName: string;
  role: IRole;
}
