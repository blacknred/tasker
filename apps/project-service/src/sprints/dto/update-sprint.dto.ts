import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';
import { CreateSprintDto } from './create-sprint.dto';

export class UpdateSprintDto extends PartialType(
  OmitType(CreateSprintDto, ['projectId']),
) {
  @ApiProperty({
    type: 'string',
    example: 'Very first sprint',
    required: false,
  })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  details?: string;
}
