import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/shared';
import { ISearchEntry } from '@taskapp/shared';
import { entryMock } from './entry-response.dto';

export const entryPaginationMock = {
  items: [entryMock],
  hasMore: true,
  total: 10,
};

export class EntriesResponseDto extends PaginatedResponseDto<ISearchEntry> {
  @ApiProperty({ example: entryPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: ISearchEntry[];
  };
}
