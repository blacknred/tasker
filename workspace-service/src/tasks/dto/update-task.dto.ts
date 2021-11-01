import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
