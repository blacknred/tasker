import { IRole } from 'src/roles/interfaces/role.interface';

export interface IAgent {
  id: string;
  userId: number;
  userName: string;
  avatar?: string;
  createdAt: Date;
  workspaceId: string; //?
  role?: Partial<IRole>;
}
