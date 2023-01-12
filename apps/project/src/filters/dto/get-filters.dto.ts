import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/service-core';
import { IsIn, IsOptional, Length } from 'class-validator';

export class GetFiltersDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'name', required: false })
  @IsOptional()
  @IsIn(['name'], {
    message: 'Must be a one of the fields: "name"',
  })
  'sort.field'?: 'name';

  @ApiProperty({ type: 'string', example: 'Super Project', required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  name?: string;
}
