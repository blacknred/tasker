import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto, issueVoteMock } from '@taskapp/shared';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class GetVotesDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'uuid',
    example: issueVoteMock.issue.id,
    required: false,
  })
  @ValidateIf((dto: GetVotesDto) => !!dto.issueId)
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueVoteMock.user.id,
    required: false,
  })
  @ValidateIf((dto: GetVotesDto) => !!dto.authorId)
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly authorId?: string;
}
