import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IStatus } from '@taskapp/shared';
import { statusMock } from './status-response.dto';

export const statusPaginationMock = {
  items: [statusMock],
  hasMore: true,
  total: 10,
};

export class StatusesResponseDto extends PaginatedResponseDto<IStatus> {
  @ApiProperty({ example: statusPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IStatus[];
  };
}
