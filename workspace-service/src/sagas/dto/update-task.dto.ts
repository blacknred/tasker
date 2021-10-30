import { PartialType } from '@nestjs/mapped-types';
import { ObjectID } from 'typeorm';
import { CreateTaskDto } from '../create-task.dto';
import { IsMongoId } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
