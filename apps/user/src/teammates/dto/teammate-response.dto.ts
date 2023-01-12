import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { ITeammate } from '@taskapp/shared';
import { roleMock } from '../../roles/dto/role-response.dto';
import { userMock } from '../../users/dto/user-response.dto';

export const teammateMock: ITeammate = {
  user: userMock,
  role: roleMock,
  isActive: true,
  createdAt: '2022-08-14 13:55:16.622111',
};

export class TeammateResponseDto extends ResponseDto<ITeammate> {
  @ApiProperty({ example: teammateMock, required: false })
  data?: ITeammate;
}
