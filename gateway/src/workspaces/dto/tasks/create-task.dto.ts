import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskType } from '../../interfaces/task.interface';

export class CreateTaskDto {
  @ApiProperty({ example: 'test task', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;

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

  @ApiProperty({ example: '123234123424' })
  expiresAt?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  workspaceId: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  sagaId?: string;
}
