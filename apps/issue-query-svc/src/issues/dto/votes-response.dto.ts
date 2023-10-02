import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueVote,
  PaginatedResponseDto,
  issueVoteMock,
} from '@taskapp/shared';

export const issueVotePaginationMock = {
  items: [issueVoteMock],
  hasMore: true,
  total: 10,
};

export class VotesResponseDto extends PaginatedResponseDto<IIssueVote> {
  @ApiProperty({ example: issueVotePaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueVote[];
  };
}
