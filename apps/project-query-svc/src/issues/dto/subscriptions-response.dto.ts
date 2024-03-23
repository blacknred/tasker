import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueSubscription,
  PaginatedResponseDto,
  issueSubscriptionMock,
  paginationMock,
} from '@taskapp/shared';

export class SubscriptionsResponseDto extends PaginatedResponseDto<IIssueSubscription> {
  @ApiProperty({
    example: paginationMock(issueSubscriptionMock),
    required: false,
  })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueSubscription[];
  };
}
