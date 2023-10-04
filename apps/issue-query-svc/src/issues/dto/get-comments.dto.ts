import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto, issueCommentMock } from '@taskapp/shared';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class GetCommentsDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'uuid',
    example: issueCommentMock.issueId,
    required: false,
  })
  @ValidateIf((dto: GetCommentsDto) => !!dto.issueId)
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueCommentMock.author.id,
    required: false,
  })
  @ValidateIf((dto: GetCommentsDto) => !!dto.authorId)
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly authorId?: string;
}
