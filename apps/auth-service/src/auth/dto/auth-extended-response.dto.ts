import { ApiProperty } from '@nestjs/swagger';
import { IAuthExtended, ProjectPermission, ResponseDto } from '@taskapp/shared';

export const authExtendedMock: IAuthExtended = {
  userId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  permissions: {
    'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30': [
      ProjectPermission.PROJECT_MANAGEMENT,
      ProjectPermission.REPORT_ACCESS,
    ],
  },
  locale: 'en_EN',
  name: 'John Dou',
  image: 'https://path-to-profile-avatar.png',
  vapidPublicKey: 'Bsr56...',
};

export class AuthExtendedResponseDto extends ResponseDto<IAuthExtended> {
  @ApiProperty({ example: authExtendedMock })
  readonly data: IAuthExtended;
}
