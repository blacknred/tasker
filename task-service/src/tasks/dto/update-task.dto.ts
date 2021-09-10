import { PartialType } from '@nestjs/mapped-types';
import { ObjectID } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  id: ObjectID;
}
