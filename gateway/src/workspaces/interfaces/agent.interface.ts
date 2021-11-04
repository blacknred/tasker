import { IRole } from './role.interface';

export interface IAgent {
  id: string;
  userId: number;
  userName: string;
  avatar?: string;
  createdAt: string;
  role: Partial<IRole>;
  workspaceId: string; //?
}
