    import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl, MinLength } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    type: 'string',
    example: 'Very important project',
    required: false,
  })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  readonly details?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://path-to-project-avatar.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({ message: 'Not valid url' })
  readonly image?: string;
}
