import { ApiProperty } from '@nestjs/swagger';
import { IUser, ResponseDto, userMock } from '@taskapp/shared';

export class UserResponseDto extends ResponseDto<IUser> {
  @ApiProperty({ example: userMock })
  readonly data: IUser;
}
