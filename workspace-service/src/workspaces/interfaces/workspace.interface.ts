import { ObjectID } from 'typeorm';
import { IAgent } from './agent.interface';
import { IRole } from './role.interface';
import { IStage } from './stage.interface';

export interface IWorkspace {
  id: ObjectID;
  name: string;
  description?: string;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  roles: IRole[];
  stages: IStage[];
  agents: IAgent[];
}
