import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkspaceDto, WorkspaceRoleDto } from './create-workspace.dto';

export class WorkspaceAgentDto {
  @ApiProperty({ example: 1, nullable: false })
  userId: number;

  @ApiProperty({ example: 'testname', nullable: false })
  userName: string;

  @ApiProperty({ type: WorkspaceRoleDto })
  role: WorkspaceRoleDto;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({ type: WorkspaceAgentDto, isArray: true })
  agents?: WorkspaceAgentDto[];
}
