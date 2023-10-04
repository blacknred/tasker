import { ApiProperty } from '@nestjs/swagger';
import { sprintMock } from '@taskapp/shared';
import { IsDateString, IsOptional, IsUUID, Length } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty({
    type: 'uuid',
    example: sprintMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId: string;

  @ApiProperty({ type: 'string', example: sprintMock.name })
  @Length(1, 30, { message: 'Must have from 1 to 30 chars' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: sprintMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 1000, { message: 'Must have from 1 to 1000 chars' })
  readonly details?: string;

  @ApiProperty({
    type: 'date',
    example: sprintMock.startsAt,
  })
  @IsDateString(null, { message: 'Must be a date string' })
  readonly startsAt: string;

  @ApiProperty({
    type: 'date',
    example: sprintMock.endsAt,
  })
  @IsDateString(null, { message: 'Must be a date string' })
  readonly endsAt: string;
}
