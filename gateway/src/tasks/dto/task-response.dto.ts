import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ITask, TaskPriority, TaskType } from '../interfaces/task.interface';

export const taskMock = {
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
  @ApiProperty({ example: taskMock, nullable: false })
  data: ITask;
}
