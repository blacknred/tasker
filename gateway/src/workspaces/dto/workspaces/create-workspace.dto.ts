import { ApiProperty } from '@nestjs/swagger';
import { Privilege } from '../../interfaces/role.interface';

export class WorkspaceRoleDto {
  @ApiProperty({ example: 'test role', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;

  @ApiProperty({
    enum: Privilege,
    example: Privilege.READ_ANY_TASK,
    isArray: true,
  })
  privileges?: Privilege[];
}

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'test workspace', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;

  @ApiProperty({ type: 'string', isArray: true })
  labels?: string[];

  @ApiProperty({ type: WorkspaceRoleDto, isArray: true })
  roles?: WorkspaceRoleDto[];
}
