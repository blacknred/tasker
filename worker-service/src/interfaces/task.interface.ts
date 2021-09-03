export type TaskType = 'LONG' | 'SHORT' | 'MEDIUM';

export type TaskPriority = 'CRITICAL' | 'MAJOR' | 'MODERATE' | 'LOW';

export interface ITask {
  name: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  createdAt: number;
  finishedAt?: number;
}