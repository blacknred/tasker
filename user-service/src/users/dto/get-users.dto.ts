import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  Min,
  IsIn,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'email', 'createdAt'], {
    message: 'Must be a one of fields of the User entity',
  })
  'sort.field'?: 'name' | 'email' | 'createdAt';

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

export class GetUsersDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['password', 'image'] as const)),
  PaginationDto,
  SortingDto,
) {
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  partial?: boolean;
}
