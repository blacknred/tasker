import { ObjectID } from 'typeorm';
import { IAgent } from './agent.interface';
import { IRole } from './role.interface';

export enum BaseLabel {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface IWorkspace {
  id: ObjectID;
  name: string;
  description?: string;
  creatorId: number;
  labels: string[];
  roles: IRole[];
  agents: IAgent[];
  createdAt: Date;
  updatedAt: Date;
  me?: IAgent;
}
