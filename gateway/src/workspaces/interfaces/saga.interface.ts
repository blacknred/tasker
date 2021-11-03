import { IAgent } from '../../workspaces/interfaces/agent.interface';

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  createdAt: string;
  expiresAt?: string;
  creator: IAgent;
}
