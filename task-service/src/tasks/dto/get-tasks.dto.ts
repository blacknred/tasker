import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class GetTasksDto extends PartialType(CreateTaskDto) {
  limit: number;
  cursor: string;
}
