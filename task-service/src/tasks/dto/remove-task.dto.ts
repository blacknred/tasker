import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class RemoveTaskDto extends PartialType(CreateTaskDto) {
  id: number;
}
