import { ApiProperty } from '@nestjs/swagger';
import { IRole, PaginatedResponseDto, paginationMock } from '@taskapp/shared';
import { roleMock } from '@taskapp/shared/mocks/role';

export class RolesResponseDto extends PaginatedResponseDto<IRole> {
  @ApiProperty({ example: paginationMock(roleMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IRole[];
  };
}
