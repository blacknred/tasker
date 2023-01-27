import { ApiProperty } from '@nestjs/swagger';
import { IInvitation, ResponseDto } from '@taskapp/shared';

export const invitationMock: IInvitation = {
  email: 'test@email.com',
  roleId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  endsAt: '2022-08-14 13:55:16.622111',
};

export class InvitationResponseDto extends ResponseDto<IInvitation> {
  @ApiProperty({ example: invitationMock, required: false })
  readonly data?: IInvitation;
}
