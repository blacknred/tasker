import { ApiProperty } from '@nestjs/swagger';

export class GetRoleDto {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  roleId: string;
}
