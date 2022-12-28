import { PaginatedResponseDto } from '@taskapp/service-core';
import { IUser } from '@taskapp/types';

// export const userPaginationMock = {
//   hasMore: true,
//   total: 100,
//   items: [userMock],
// };

export class UsersResponseDto extends PaginatedResponseDto<Partial<IUser>> {
  // @ApiProperty({ example: userPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IUser[];
  };
}
