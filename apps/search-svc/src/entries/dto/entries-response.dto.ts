import { ApiProperty } from '@nestjs/swagger';
import {
  ISearchEntry,
  PaginatedResponseDto,
  paginationMock,
  searchEntryMock,
} from '@taskapp/shared';

export class EntriesResponseDto extends PaginatedResponseDto<ISearchEntry> {
  @ApiProperty({ example: paginationMock(searchEntryMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: ISearchEntry[];
  };
}
