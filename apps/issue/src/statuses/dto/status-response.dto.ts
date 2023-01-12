import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IStatus } from '@taskapp/shared';

export const statusMock: IStatus = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'TESTING',
  color: '#333333',
  isFirst: false,
  isLast: false,
  transitions: [
    {
      id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
      projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
      name: 'DONE',
      color: '#333333',
      isFirst: false,
      isLast: true,
      transitions: [],
    },
  ],
};

export class StatusResponseDto extends ResponseDto<IStatus> {
  @ApiProperty({ example: statusMock, required: false })
  data?: IStatus;
}
