import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsMongoId, IsOptional } from 'class-validator';
import { ObjectID } from 'typeorm';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateTaskDto } from './create-task.dto';

class TaskSortingDto extends SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'type', 'priority', 'creator', 'createdAt', 'expiresAt'], {
    message: 'Must be a one of fields of the Task entity',
  })
  'sort.field'?:
    | 'name'
    | 'type'
    | 'priority'
    | 'creator'
    | 'createdAt'
    | 'expiresAt';
}

export class GetTasksDto extends IntersectionType(
  PartialType(OmitType(CreateTaskDto, ['description'])),
  AccessDto,
  PaginationDto,
  TaskSortingDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  creatorId: ObjectID;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
