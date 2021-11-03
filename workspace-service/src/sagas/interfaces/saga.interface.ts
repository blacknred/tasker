import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ObjectID } from 'typeorm';

export interface ISaga {
  id: ObjectID;
  name: string;
  description?: string;
  workspaceId: ObjectID;
  createdAt: Date;
  expiresAt?: Date;
  creator: IAgent;
}
