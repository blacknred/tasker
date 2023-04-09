import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/shared';
import { ISprint } from '@taskapp/shared';

export const sprintMock: ISprint = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  authorId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'SP-sprint:1',
  details: 'Very first sprint',
  startsAt: '2022-08-14 13:55:16.622111',
  endsAt: '2022-08-14 13:55:16.622111',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export class SprintResponseDto extends ResponseDto<ISprint> {
  @ApiProperty({ example: sprintMock, required: false })
  readonly data?: ISprint;
}
