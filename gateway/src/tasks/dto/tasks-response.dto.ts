import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ITask } from '../interfaces/task.interface';
import { taskExample } from './task-response.dto';

export class TasksResponseDto extends ResponseDto {
  @ApiProperty({ example: [taskExample], nullable: true })
  data: ITask[];
}
