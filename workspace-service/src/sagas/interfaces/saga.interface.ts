import { IAgent } from 'src/agents/interfaces/agent.interface';

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  expiresAt?: Date;
  creator: IAgent;
}
