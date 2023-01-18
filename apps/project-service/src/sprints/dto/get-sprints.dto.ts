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

export class GetSprintsDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['name', 'startsAt', 'endsAt', 'createdAt'], {
    message:
      'Must be a one of the fields: "name", "startsAt", "endsAt", "createdAt"',
  })
  'sort.field'?: 'name' | 'startsAt' | 'endsAt' | 'createdAt';

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: true,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({ type: 'string', example: 'SP-sprint:1', required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  name?: string;

  @ApiProperty({
    type: 'string',
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  startsAt?: string;

  @ApiProperty({
    type: 'string',
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  endsAt?: string;

  @ApiProperty({
    type: 'string',
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
