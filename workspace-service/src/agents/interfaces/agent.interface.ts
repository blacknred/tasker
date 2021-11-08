import { IRole } from 'src/roles/interfaces/role.interface';

export interface IAgent {
  id: string;
  userId: number;
  name: string;
  avatar?: string;
  createdAt: Date;
  role?: IRole;
}
