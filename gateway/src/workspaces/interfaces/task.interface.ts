import { IAgent } from './agent.interface';
import { ISaga } from './saga.interface';

export interface IUpdateRecord {
  field: string;
  prev: unknown;
  next: unknown;
}

export interface ITaskUpdate {
  records: IUpdateRecord[];
  agent: IAgent;
  createdAt: string;
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  stage: string;
  label?: string;
  assignee?: IAgent;
  creator: IAgent;
  sagas: Partial<ISaga>[];
  updates: ITaskUpdate[];
  createdAt: string;
  expiresAt?: string;
  workspaceId: string;
}
