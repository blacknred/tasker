import { IAgent } from '../../workspaces/interfaces/agent.interface';

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  expiresAt?: string;
  creator: IAgent;
}
