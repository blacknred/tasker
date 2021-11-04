import { ApiProperty } from '@nestjs/swagger';
import { IRole } from 'src/workspaces/interfaces/role.interface';
import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import { roleMock } from './role-response.dto';

const rolePaginationMock = {
  hasMore: true,
  total: 100,
  items: [roleMock],
};

export class RolesResponseDto extends PaginatedResponseDto<IRole> {
  @ApiProperty({ example: rolePaginationMock, nullable: false })
  data: {
    hasMore: boolean;
    total: number;
    items: IRole[];
  };
}
