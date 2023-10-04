import { ApiProperty } from '@nestjs/swagger';
import {
  ISprint,
  PaginatedResponseDto,
  paginationMock,
  sprintMock,
} from '@taskapp/shared';

export class SprintsResponseDto extends PaginatedResponseDto<ISprint> {
  @ApiProperty({ example: paginationMock(sprintMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: ISprint[];
  };
}
