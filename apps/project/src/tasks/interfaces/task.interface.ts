import { IAgent } from 'src/agents/interfaces/agent.interface';

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
  id: string;
  name: string;
  description?: string;
  stage?: string;
  label?: string;
  createdAt: Date;
  expiresAt?: Date;
  updates: ITaskUpdate[];
  creator: IAgent;
  assignee?: IAgent;
  sagas: any; //Pick<ISaga, 'id' | 'name'>[];
}
