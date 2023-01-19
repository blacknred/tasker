import { ApiProperty } from '@nestjs/swagger';
import { IProject, ProjectType, ResponseDto } from '@taskapp/shared';
import { sprintMock } from '../../sprints/dto/sprint-response.dto';

export const projectMock: IProject = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  authorId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Super Project',
  key: 'SP',
  details: 'Very important project',
  image: 'https://path-to-project-avatar.png',
  type: ProjectType.SCRUM,
  isUnlimited: false,
  activeSprint: sprintMock,
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export class ProjectResponseDto extends ResponseDto<IProject> {
  @ApiProperty({ example: projectMock, required: false })
  readonly data?: IProject;
}
