import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';
import { ITask, TaskPriority, TaskType } from '../interfaces/task.interface';

export const taskExample = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'first task',
  description: 'test task description',
  userId: 1,
  type: TaskType.SHORT,
  priority: TaskPriority.LOW,
  createdAt: +new Date(),
  finishedAt: +new Date(),
};

export class TaskResponseDto {
  @ApiProperty({ example: taskExample, nullable: true })
  data: ITask;
  @ApiProperty({ example: null, nullable: true })
  errors: ResponseError[];
}
