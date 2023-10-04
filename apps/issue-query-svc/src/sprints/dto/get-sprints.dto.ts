import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto, sprintMock } from '@taskapp/shared';
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
  readonly 'sort.field'?: 'name' | 'startsAt' | 'endsAt' | 'createdAt';

  @ApiProperty({
    type: 'uuid',
    example: sprintMock.projectId,
    required: true,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId: string;

  @ApiProperty({ type: 'string', example: sprintMock.name, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly name?: string;

  @ApiProperty({
    type: 'string',
    example: sprintMock.startsAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly startsAt?: string;

  @ApiProperty({
    type: 'string',
    example: sprintMock.endsAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly endsAt?: string;

  @ApiProperty({
    type: 'string',
    example: sprintMock.createdAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly createdAt?: string;
}
