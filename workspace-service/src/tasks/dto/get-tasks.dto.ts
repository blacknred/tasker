import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsMongoId, IsOptional } from 'class-validator';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateTaskDto } from './create-task.dto';

class TasksSortingDto extends SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(
    [
      'name',
      'stage',
      'label',
      'createdAt',
      'expiresAt',
      'creatorId',
      'assigneeId',
      'sagaId',
    ],
    {
      message: 'Must be a one of fields of the Task entity',
    },
  )
  'sort.field'?:
    | 'name'
    | 'stage'
    | 'label'
    | 'createdAt'
    | 'expiresAt'
    | 'creatorId'
    | 'assigneeId'
    | 'sagaId';
}

export class GetTasksDto extends IntersectionType(
  PartialType(OmitType(CreateTaskDto, ['description'])),
  AccessDto,
  PaginationDto,
  TasksSortingDto,
) {
  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  creatorId: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  sagaId: string;
}
