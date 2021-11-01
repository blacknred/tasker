import { ObjectID } from 'typeorm';
import { IAgent } from './agent.interface';
import { IRole } from './role.interface';

export interface IWorkspace {
  id: ObjectID;
  name: string;
  description?: string;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  stages: string[];
  roles: IRole[];
  agents: IAgent[];
}
