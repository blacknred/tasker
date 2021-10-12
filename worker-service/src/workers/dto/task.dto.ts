export enum TaskType {
  LONG = 'LONG',
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
}

export enum TaskPriority {
  CRITICAL = 'CRITICAL',
  MAJOR = 'MAJOR',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

export class TaskDto {
  id: string;
  name: string;
  description: string;
  userId: number;
  type: TaskType;
  priority: TaskPriority;
  finishedAt?: number;
}
