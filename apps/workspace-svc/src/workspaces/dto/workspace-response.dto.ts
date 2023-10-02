import { ApiProperty } from '@nestjs/swagger';
import { IAuth, IWorkspace, Permission, ResponseDto } from '@taskapp/shared';

export const workspaceMock: IWorkspace = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  // needTfa: true,
  // permissions: {
  //   'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30': [
  //     Permission.PROJECT_MANAGEMENT,
  //     Permission.REPORT_ACCESS,
  //   ],
  // },
};

export class WorkspaceResponseDto extends ResponseDto<IAuth> {
  @ApiProperty({ example: workspaceMock })
  readonly data: IWorkspace;
}
