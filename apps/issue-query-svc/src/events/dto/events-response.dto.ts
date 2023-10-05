import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto, paginationMock } from '@taskapp/shared';

export class EventsResponseDto extends PaginatedResponseDto<any> {
  @ApiProperty({ example: paginationMock({}), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: any[];
  };
}
