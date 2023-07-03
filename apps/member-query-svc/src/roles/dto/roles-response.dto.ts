import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IRole } from '@taskapp/shared';
import { roleMock } from './role-response.dto';

export const rolePaginationMock = {
  items: [roleMock],
  hasMore: true,
  total: 10,
};

export class RolesResponseDto extends PaginatedResponseDto<IRole> {
  @ApiProperty({ example: rolePaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IRole[];
  };
}
