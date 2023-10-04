import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto, issueSubscriptionMock } from '@taskapp/shared';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class GetSubscriptionsDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'uuid',
    example: issueSubscriptionMock.issue.id,
    required: false,
  })
  @ValidateIf((dto: GetSubscriptionsDto) => !!dto.issueId)
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueSubscriptionMock.user.id,
    required: false,
  })
  @ValidateIf((dto: GetSubscriptionsDto) => !!dto.authorId)
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly authorId?: string;
}
