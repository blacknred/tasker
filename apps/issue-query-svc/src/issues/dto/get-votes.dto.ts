import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto } from '@taskapp/shared';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class GetVotesDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @ValidateIf((dto: GetVotesDto) => !!dto.issueId)
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId?: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @ValidateIf((dto: GetVotesDto) => !!dto.authorId)
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly authorId?: string;
}
