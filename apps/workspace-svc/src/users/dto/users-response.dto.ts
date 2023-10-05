import { ApiProperty } from '@nestjs/swagger';
import {
  IUser,
  PaginatedResponseDto,
  paginationMock,
  userMock,
} from '@taskapp/shared';

export class UsersResponseDto extends PaginatedResponseDto<IUser> {
  @ApiProperty({ example: paginationMock(userMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IUser[];
  };
}
