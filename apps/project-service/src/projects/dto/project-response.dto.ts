import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IProject, ProjectType } from '@taskapp/shared';

export const projectMock: IProject = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  authorId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Super Project',
  key: 'SP',
  details: 'Very important project',
  image: 'https://path-to-project-avatar.png',
  type: ProjectType.SCRUM,
  activeSprint: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export class ProjectResponseDto extends ResponseDto<IProject> {
  @ApiProperty({ example: projectMock, required: false })
  data?: IProject;
}
