import { ApiProperty } from '@nestjs/swagger';
import { IWorkspace, ResponseDto } from '@taskapp/shared';
import { workspaceMock } from '@taskapp/shared/mocks/workspace';

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {
  @ApiProperty({ example: workspaceMock })
  readonly data: IWorkspace;
}
