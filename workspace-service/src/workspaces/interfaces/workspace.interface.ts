import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ObjectID } from 'typeorm';
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
  createdAt: Date;
  updatedAt: Date;
  //
  agent?: IAgent;
}
