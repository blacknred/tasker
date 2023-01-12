import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IFilter } from '@taskapp/shared';
import { filterMock } from './filter-response.dto';

export const filterPaginationMock = {
  items: [filterMock],
  hasMore: true,
  total: 10,
};

export class FiltersResponseDto extends PaginatedResponseDto<IFilter> {
  @ApiProperty({ example: filterPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IFilter[];
  };
}
