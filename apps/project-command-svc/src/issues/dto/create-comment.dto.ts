import { ApiProperty } from '@nestjs/swagger';
import { issueCommentMock } from '@taskapp/shared';
import { IsArray, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
    example: issueCommentMock.body,
  })
  @Length(1, 1000, { message: 'Must have from 1 to 1000 chars' })
  body: string;

  @ApiProperty({
    type: 'string',
    example: issueCommentMock.assets,
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsUrl(null, { message: 'Must includes a valid ids', each: true })
  assets?: string[];
}
