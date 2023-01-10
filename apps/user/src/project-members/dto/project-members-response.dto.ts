import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IUser } from '@taskapp/types';
import { userMock } from './project-member-response.dto';

export const userPaginationMock = {
  hasMore: true,
  total: 100,
  items: [userMock],
};

export class ProjectMembersResponseDto extends PaginatedResponseDto<Partial<IUser>> {
  @ApiProperty({ example: userPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IUser[];
  };
}
