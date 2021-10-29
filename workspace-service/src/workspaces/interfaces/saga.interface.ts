import { ObjectID } from 'typeorm';
import { IAgent } from './agent.interface';

export interface ISaga {
  id: ObjectID;
  name: string;
  description?: string;
  creator: IAgent;
  createdAt: Date;
  expiresAt?: Date;
}
