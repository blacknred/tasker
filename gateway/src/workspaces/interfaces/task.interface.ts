import { IAgent } from './agent.interface';

export enum TaskType {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum TaskPriority {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
}

export interface ITaskHistoryUpdate {
  label?: string;
  agent?: IAgent;
  createdAt: string;
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  history: ITaskHistoryUpdate[];
  workspaceId: string;
  sagaIds: string[];
  createdAt: string;
  expiresAt?: string;
  creator: IAgent;
}
