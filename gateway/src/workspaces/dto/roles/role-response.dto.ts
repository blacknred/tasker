import { ApiProperty } from '@nestjs/swagger';
import { IRole } from 'src/workspaces/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';

export const roleMock: IRole = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'testrole',
  privileges: [],
};

export class RoleResponseDto extends ResponseDto<IRole> {
  @ApiProperty({ example: roleMock })
  data?: IRole;
}
