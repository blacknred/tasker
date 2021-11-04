import { IAgent } from './agent.interface';
import { ISaga } from './saga.interface';

interface ITaskUpdateState<T> {
  field: keyof Omit<
    ITask,
    'updates' | 'id' | 'creator' | 'createdAt' | 'workspaceId'
  >;
  prev: T;
  next: T;
}

export interface ITaskUpdate<T = unknown> {
  state: ITaskUpdateState<T>;
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
