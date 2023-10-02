import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/shared';

export const eventPaginationMock = {
  items: [],
  hasMore: true,
  total: 10,
};

export class EventsResponseDto extends PaginatedResponseDto<any> {
  @ApiProperty({ example: eventPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: any[];
  };
}
