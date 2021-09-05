import { TaskType, TaskPriority } from '../entities/task.entity';
export class CreateTaskDto {
  name: string;
  description: string;
  type: TaskType;
  userId: number;
  priority: TaskPriority;
  createdAt: Date;
  finishedAt?: Date;
}
