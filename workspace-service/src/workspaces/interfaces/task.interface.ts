import { ObjectID } from 'typeorm';
import { IAgent } from './agent.interface';
import { IStage } from './stage.interface';

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

export interface IStageUpdate {
  stage: IStage;
  agent: IAgent;
}

export interface ITask {
  id: ObjectID;
  name: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  creator: IAgent;
  history: IStageUpdate[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}
