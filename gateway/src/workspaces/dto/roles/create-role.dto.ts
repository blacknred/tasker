import { ApiProperty } from '@nestjs/swagger';
import { Privilege } from 'src/workspaces/interfaces/role.interface';

export class CreateRoleDto {
  @ApiProperty({ example: 'testrole', nullable: false })
  name: string;

  @ApiProperty({
    enum: Privilege,
    example: Privilege.READ_ANY_TASK,
    isArray: true,
    nullable: false,
  })
  privileges: Privilege[];
}
