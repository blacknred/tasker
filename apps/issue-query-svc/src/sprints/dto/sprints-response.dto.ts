import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/shared';
import { ISprint } from '@taskapp/shared';
import { sprintMock } from './sprint-response.dto';

export const sprintPaginationMock = {
  items: [sprintMock],
  hasMore: true,
  total: 10,
};

export class SprintsResponseDto extends PaginatedResponseDto<ISprint> {
  @ApiProperty({ example: sprintPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: ISprint[];
  };
}
