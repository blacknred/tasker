import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '@taskapp/shared';
import { IsEnum, Length } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ type: 'string', example: 'SP' })
  @Length(3, 10, { message: 'Must have from 3 to 10 chars' })
  key: string;

  @ApiProperty({ type: 'string', example: 'Super Project' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  name: string;

  @ApiProperty({
    enum: ProjectType,
    example: ProjectType.SCRUM,
  })
  @IsEnum(ProjectType, {
    message: `Must be a one of the fields: ${Object.keys(ProjectType).join(
      ', ',
    )}`,
  })
  type: ProjectType;
}
