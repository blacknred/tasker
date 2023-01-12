import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { ITeammate } from '@taskapp/types';
import { teammateMock } from './teammate-response.dto';

export const teammatePaginationMock = {
  hasMore: true,
  total: 10,
  items: [teammateMock],
};

export class TeammatesResponseDto extends PaginatedResponseDto<ITeammate> {
  @ApiProperty({ example: teammateMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: ITeammate[];
  };
}
