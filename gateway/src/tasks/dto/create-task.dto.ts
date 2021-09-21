import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskType, ITask } from '../interfaces/task.interface';

export class CreateTaskDto
  implements Omit<ITask, 'id' | 'userId' | 'createdAt'>
{
  @ApiProperty({ example: 'first task', nullable: false })
  name: string;
  @ApiProperty({ example: 'first task description', nullable: false })
  description: string;
  @ApiProperty({
    default: TaskType.SHORT,
    example: TaskType.SHORT,
    nullable: false,
    enum: TaskType,
  })
  type: TaskType;
  @ApiProperty({
    default: TaskPriority.LOW,
    example: TaskPriority.LOW,
    nullable: false,
    enum: TaskPriority,
  })
  priority: TaskPriority;
}
