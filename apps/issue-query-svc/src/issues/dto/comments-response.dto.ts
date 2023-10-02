import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueComment,
  PaginatedResponseDto,
  issueCommentMock,
} from '@taskapp/shared';

export const issueCommentsPaginationMock = {
  items: [issueCommentMock],
  hasMore: true,
  total: 10,
};

export class CommentsResponseDto extends PaginatedResponseDto<IIssueComment> {
  @ApiProperty({ example: issueCommentsPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueComment[];
  };
}
