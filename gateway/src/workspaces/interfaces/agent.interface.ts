import { IRole } from './role.interface';

export interface IAgent {
  id: string;
  workspaceId: string;
  userId: number;
  userName: string;
  createdAt: string;
  role: IRole;
}
