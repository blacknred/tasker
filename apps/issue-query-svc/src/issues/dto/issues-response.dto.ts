import { ApiProperty } from '@nestjs/swagger';
import {
  IIssue,
  PaginatedResponseDto,
  issueMock,
  paginationMock,
} from '@taskapp/shared';

export class IssuesResponseDto extends PaginatedResponseDto<IIssue> {
  @ApiProperty({ example: paginationMock(issueMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssue[];
  };
}
