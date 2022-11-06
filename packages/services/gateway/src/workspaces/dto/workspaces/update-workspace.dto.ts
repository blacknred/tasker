import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseLabel, BaseStage } from 'src/workspaces/interfaces/task.interface';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class RoleDto {
  @ApiProperty({ example: 'testrole' })
  name: string;

  @ApiProperty({
    enum: Privilege,
    example: Privilege.EDIT_WORKSPACE,
    isArray: true,
  })
  privileges: Privilege[];
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  id: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: Object.values(BaseStage),
    required: false,
  })
  stages?: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: Object.values(BaseLabel),
    required: false,
  })
  labels?: string[];

  @ApiProperty({
    type: RoleDto,
    isArray: true,
    required: false,
  })
  roles?: RoleDto[];
}
