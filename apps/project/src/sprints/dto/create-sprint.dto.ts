import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID, Length } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({ type: 'string', example: 'SP-sprint:1' })
  @Length(5, 30, { message: 'Must have from 5 to 30 chars' })
  name: string;

  @ApiProperty({
    type: 'date',
    example: '2022-08-14 13:55:16.622111',
  })
  @IsDateString(null, { message: 'Must be a date string' })
  startsAt: string;

  @ApiProperty({
    type: 'date',
    example: '2022-08-14 13:55:16.622111',
  })
  @IsDateString(null, { message: 'Must be a date string' })
  endsAt: string;
}
