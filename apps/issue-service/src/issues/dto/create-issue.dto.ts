import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';

export class CreateTaskDto extends AccessDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(500, { message: 'Must include no more than 500 chars' })
  readonly name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({ strict: true }, { message: 'Must be a date string' })
  expiresAt?: Date;

  @IsString({ message: 'Must be a string' })
  stage: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  label?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  assigneeId?: string;

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsMongoId({ message: 'Must includes a valid ids', each: true })
  sagaIds?: string[];
}



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
  PartialType(OmitType(CreateTaskDto, ['description', 'sagaIds'])),
  AccessDto,
  PaginationDto,
  TasksSortingDto,
) {
  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  creatorId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  sagaId?: string;
}
