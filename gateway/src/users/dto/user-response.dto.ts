import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { IUser, Role } from '../interfaces/user.interface';

export const userMock = {
  id: 1,
  name: 'username',
  email: 'test@email.com',
  roles: [Role.USER],
  createdAt: +new Date(),
  updatedAt: +new Date(),
};

export class UserResponseDto extends ResponseDto {
  @ApiProperty({ example: userMock, nullable: true })
  data?: IUser;
}
