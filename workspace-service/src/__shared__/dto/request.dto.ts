import { Type } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ObjectID } from 'typeorm';

export class SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsString({ message: 'Must be a string' })
  'sort.field'?: string;

  @IsOptional()
  @Type(() => String)
  @IsIn(['ASC', 'DESC'], { message: 'Must be an ASC or DESC' })
  'sort.order'?: 'ASC' | 'DESC';
}

export class PaginationDto {
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}

export class AccessDto {
  @IsMongoId({ message: 'Invalid identificator' })
  wid: ObjectID;

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
