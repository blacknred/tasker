import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/shared';

export const authMock: Auth = {
  id: 1,
};

export class AuthResponseDto extends ResponseDto<> {
  @ApiProperty({ example: authMock })
  data: Auth;
}
