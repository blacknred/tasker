import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/service-core';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class GetRolesDto extends OmitType(PaginatedRequestDto, ['sort.field']) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['name', 'createdAt'], {
    message: 'Must be a one of the fields: "name", "createdAt"',
  })
  'sort.field'?: 'name' | 'createdAt';

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({ type: 'string', example: 'Developer', required: false })
  @IsOptional()
  @Length(0, 30, { message: 'Must have up to 30 chars' })
  name?: string;

  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
