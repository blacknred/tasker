import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsString } from 'class-validator';

export class GetTasksDto extends PartialType(CreateTaskDto) {
  @IsNumber(null, { message: 'Must be an integer' })
  limit: number;
  @IsString({ message: 'Must be a string' })
  cursor: string;
}
