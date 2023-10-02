import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueSubscription,
  PaginatedResponseDto,
  issueSubscriptionMock,
} from '@taskapp/shared';

export const issueSubscriptionPaginationMock = {
  items: [issueSubscriptionMock],
  hasMore: true,
  total: 10,
};

export class SubscriptionsResponseDto extends PaginatedResponseDto<IIssueSubscription> {
  @ApiProperty({ example: issueSubscriptionPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueSubscription[];
  };
}
