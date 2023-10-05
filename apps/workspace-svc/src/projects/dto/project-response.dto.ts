import { ApiProperty } from '@nestjs/swagger';
import { IProject, ResponseDto, projectMock } from '@taskapp/shared';

export class ProjectResponseDto extends ResponseDto<IProject> {
  @ApiProperty({ example: projectMock })
  readonly data: IProject;
}
