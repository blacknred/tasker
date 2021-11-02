import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceRoleDto } from '../workspaces/create-workspace.dto';

export class CreateAgentDto {
  @ApiProperty({ example: 1, nullable: false })
  userId: number;

  @ApiProperty({ example: 'testname', nullable: false })
  userName: string;

  @ApiProperty({ type: WorkspaceRoleDto, nullable: false })
  role: WorkspaceRoleDto;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  workspaceId: string;
}
