import { ApiProperty } from '@nestjs/swagger';
import { IRole, ResponseDto } from '@taskapp/shared';
import { roleMock } from '@taskapp/shared/mocks';

export class RoleResponseDto extends ResponseDto<IRole> {
  @ApiProperty({ example: roleMock })
  readonly data: IRole;
}
