import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { PaginationDto, SortingDto } from '../../__shared__/dto/request.dto';
import { CreateSagaDto } from './create-saga.dto';
import { ISaga } from '../interfaces/saga.interface';
import { IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class SagaSortingDto extends SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'description', 'creator', 'createdAt', 'expiresAt'], {
    message: 'Must be a one of fields of the Saga entity',
  })
  'sort.field'?: keyof Omit<ISaga, 'id'>;
}

export class GetSagasDto extends IntersectionType(
  PartialType(CreateSagaDto),
  PaginationDto,
  SagaSortingDto,
) {}
