import { ObjectID } from 'typeorm';

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

export interface ITask {
  id: ObjectID;
  name: string;
  description: string;
  userId: number;
  type: TaskType;
  priority: TaskPriority;
  createdAt: Date;
  finishedAt?: Date;
}
