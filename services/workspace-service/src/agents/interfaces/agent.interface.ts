import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';

export interface IAgent {
  id: string;
  userId: number;
  name: string;
  image?: string;
  createdAt: Date;
  role?: string;
  //
  workspace?: Workspace;
  hasPrivilege(privilege: Privilege): boolean;
}
