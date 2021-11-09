import { IRole } from './role.interface';

export interface IAgent {
  id: string;
  userId: number;
  name: string;
  image?: string;
  createdAt: string;
  role?: IRole;
}
