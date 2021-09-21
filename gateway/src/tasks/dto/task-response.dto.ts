import { ApiProperty } from '@nestjs/swagger';
import { ITask, TaskPriority, TaskType } from '../interfaces/task.interface';
import { BaseResponseDto } from './empty-response.dto';

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

export class TaskResponseDto extends BaseResponseDto {
  @ApiProperty({ example: taskExample, nullable: true })
  data: ITask;
}
