import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { ITag } from '@taskapp/shared';
import { tagMock } from './tag-response.dto';

export const tagPaginationMock = {
  items: [tagMock],
  hasMore: true,
  total: 10,
};

export class TagsResponseDto extends PaginatedResponseDto<ITag> {
  @ApiProperty({ example: tagPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: ITag[];
  };
}
