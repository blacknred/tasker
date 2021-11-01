import { ObjectID } from 'typeorm';
import { IAgent } from '../../workspaces/interfaces/agent.interface';

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

export interface ITaskUpdate {
  label?: string;
  agent?: IAgent;
  createdAt: string;
}

export interface ITask {
  id: ObjectID;
  name: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  creator: IAgent;
  history: ITaskUpdate[];
  workspaceId: ObjectID;
  sagaIds: ObjectID[];
  createdAt: string;
  expiresAt?: string;
}
