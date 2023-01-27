import { ApiProperty } from '@nestjs/swagger';
import { IAuth, ProjectPermission, ResponseDto } from '@taskapp/shared';

export const authMock: IAuth = {
  userId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  needTFA: true,
  permissions: {
    'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30': [
      ProjectPermission.PROJECT_MANAGEMENT,
      ProjectPermission.REPORT_ACCESS,
    ],
  },
};

export class AuthResponseDto extends ResponseDto<IAuth> {
  @ApiProperty({ example: authMock })
  readonly data: IAuth;
}
