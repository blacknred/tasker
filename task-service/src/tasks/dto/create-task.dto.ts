export type TaskType = 'LONG' | 'SHORT' | 'MEDIUM';

export type TaskPriority = 'CRITICAL' | 'MAJOR' | 'MODERATE' | 'LOW';

export class CreateTaskDto {
  id: number;
  name: string;
  description: string;
  type: TaskType;
  userId: number;
  priority: TaskPriority;
  createdAt: number;
  finishedAt?: number;
}
