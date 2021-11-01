import { IAgent } from '../../workspaces/interfaces/agent.interface';

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  creator: IAgent;
  workspaceId: string;
  createdAt: string;
  expiresAt?: string;
}
