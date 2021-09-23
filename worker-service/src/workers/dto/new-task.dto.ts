import { IsString, IsNumber, IsEnum } from 'class-validator';

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

export class NewTaskDto {
  @IsString({ message: 'Must be a string' })
  id: string;
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsString({ message: 'Must be a string' })
  description: string;
  @IsNumber(null, { message: 'Must be an integer' })
  userId: number;
  @IsEnum(TaskType, {
    message: `Must be one of ${Object.values(TaskType)}`,
  })
  type: TaskType;
  @IsEnum(TaskPriority, {
    message: `Must be one of ${Object.values(TaskPriority)}`,
  })
  priority: TaskPriority;
  finishedAt?: number;
}
