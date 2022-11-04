import { IAgent } from './agent.interface';
import { ISaga } from './saga.interface';

export enum BaseStage {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum BaseLabel {
  MINOR = 'MINOR',
  ROUTINE = 'ROUTINE',
  CRITICAL = 'CRITICAL',
}

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
  stage?: string;
  label?: string;
  createdAt: string;
  expiresAt?: string;
  updates: ITaskUpdate[];
  creator: IAgent;
  assignee?: IAgent;
  sagas: Pick<ISaga, 'id' | 'name'>[];
}
