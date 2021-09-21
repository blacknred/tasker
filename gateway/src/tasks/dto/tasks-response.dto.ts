import { ApiProperty } from '@nestjs/swagger';
import { ITask } from '../interfaces/task.interface';
import { BaseResponseDto } from './empty-response.dto';
import { taskExample } from './task-response.dto';

export class TasksResponseDto extends BaseResponseDto {
  @ApiProperty({ example: [taskExample], nullable: true })
  data: ITask[];
}
