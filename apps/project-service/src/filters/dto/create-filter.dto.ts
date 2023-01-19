import { ApiProperty } from '@nestjs/swagger';
import { IssueFilterField } from '@taskapp/shared';
import { Transform } from 'class-transformer';
import { IsEnum, IsString, Length, ValidateNested } from 'class-validator';

class FilterSchemaDto {
  @IsEnum(IssueFilterField, {
    message: `Must be a one of the fields: ${Object.keys(IssueFilterField).join(
      ', ',
    )}`,
  })
  readonly field: IssueFilterField;

  @IsString({ message: 'Must have from 5 to 100 chars' })
  readonly value: string | number;
}

export class CreateFilterDto {
  @ApiProperty({ type: 'string', example: 'My Filter' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: `?${IssueFilterField.ASSIGNEE_ID}=b4db61c5-d10e-4ed3-a903-b8fd75fc3d30`,
  })
  @Transform(({ value }) => new URLSearchParams(value).entries())
  @Transform(() => FilterSchemaDto)
  @ValidateNested()
  readonly schema: FilterSchemaDto[];
}
