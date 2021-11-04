import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ObjectID } from 'typeorm';

export interface ISaga {
  id: ObjectID;
  name: string;
  description?: string;
  createdAt: Date;
  expiresAt?: Date;
  creator: IAgent;
  workspaceId: ObjectID;
}
