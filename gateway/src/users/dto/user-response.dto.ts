import { ApiProperty } from '@nestjs/swagger';
import { IUser, Role } from '../interfaces/user.interface';
import { BaseResponseDto } from './empty-response.dto';

export const userExample = {
  id: 1,
  name: 'username',
  email: 'test@test.com',
  roles: [Role.USER],
  createdAt: +new Date(),
  updatedAt: +new Date(),
};

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty({ example: userExample, nullable: true })
  data?: IUser;
}
