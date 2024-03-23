import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueVote,
  PaginatedResponseDto,
  issueVoteMock,
  paginationMock,
} from '@taskapp/shared';

export class VotesResponseDto extends PaginatedResponseDto<IIssueVote> {
  @ApiProperty({ example: paginationMock(issueVoteMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueVote[];
  };
}
