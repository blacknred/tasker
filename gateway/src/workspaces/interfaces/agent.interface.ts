import { IRole } from './role.interface';

export interface IAgent {
  id: string;
  userId: number;
  userName: string;
  role: IRole;
  workspaceId: string;
  createdAt: string;
}
