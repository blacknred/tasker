import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';
import { ITask } from '../interfaces/task.interface';
import { taskExample } from './task-response.dto';

export class TasksResponseDto {
  @ApiProperty({ example: [taskExample], nullable: true })
  data: ITask[];
  @ApiProperty({ example: null, nullable: true })
  errors: ResponseError[];
}
