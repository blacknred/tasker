import { ApiProperty } from '@nestjs/swagger';
import { IIssue, PaginatedResponseDto, issueMock } from '@taskapp/shared';

export const issuePaginationMock = {
  items: [issueMock],
  hasMore: true,
  total: 10,
};

export class IssuesResponseDto extends PaginatedResponseDto<IIssue> {
  @ApiProperty({ example: issuePaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssue[];
  };
}
