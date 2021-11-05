import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ISaga } from 'src/sagas/interfaces/saga.interface';
import { ObjectID } from 'typeorm';

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
  createdAt: Date;
}

export interface ITask {
  id: ObjectID;
  name: string;
  description?: string;
  stage: string;
  label?: string;
  assignee?: IAgent;
  creator: IAgent;
  sagas: Partial<ISaga>[];
  updates: ITaskUpdate[];
  createdAt: Date;
  expiresAt?: Date;
  workspaceId: ObjectID;
}
