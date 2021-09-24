import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
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

export class TaskResponseDto extends ResponseDto {
  constructor() {
    super();
  }
  @ApiProperty({ example: taskExample, nullable: true })
  data: ITask;
}
