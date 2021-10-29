import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { IUser } from '../interfaces/user.interface';

export const userMock = {
  id: 1,
  name: 'username',
  email: 'test@email.com',
  isAdmin: false,
  createdAt: +new Date(),
  updatedAt: +new Date(),
};

export class UserResponseDto extends ResponseDto<IUser> {
  @ApiProperty({ example: userMock, nullable: true })
  data?: IUser;
}
