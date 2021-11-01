import { IAgent } from '../../workspaces/interfaces/agent.interface';

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  creator: IAgent;
  createdAt: string;
  expiresAt?: string;
}
