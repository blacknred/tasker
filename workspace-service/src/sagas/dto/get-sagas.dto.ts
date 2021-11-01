import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsMongoId, IsOptional } from 'class-validator';
import { ObjectID } from 'typeorm';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateSagaDto } from './create-saga.dto';

class SagaSortingDto extends SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'creator', 'createdAt', 'expiresAt'], {
    message: 'Must be a one of fields of the Saga entity',
  })
  'sort.field'?: 'name' | 'creator' | 'createdAt' | 'expiresAt';
}

export class GetSagasDto extends IntersectionType(
  PartialType(OmitType(CreateSagaDto, ['description'])),
  AccessDto,
  PaginationDto,
  SagaSortingDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  creatorId: ObjectID;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
