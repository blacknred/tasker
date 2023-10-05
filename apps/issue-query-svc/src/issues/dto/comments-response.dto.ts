import { ApiProperty } from '@nestjs/swagger';
import {
  IIssueComment,
  PaginatedResponseDto,
  issueCommentMock,
  paginationMock,
} from '@taskapp/shared';

export class CommentsResponseDto extends PaginatedResponseDto<IIssueComment> {
  @ApiProperty({ example: paginationMock(issueCommentMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IIssueComment[];
  };
}
