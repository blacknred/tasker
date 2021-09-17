import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';
import { IUser } from '../interfaces/user.interface';

export const userExample = {
  id: 1,
  name: 'username',
  email: 'test@test.com',
  role: 'user',
  createdAt: +new Date(),
  updatedAt: +new Date(),
};

export class UserResponseDto {
  @ApiProperty({ example: { user: userExample }, nullable: true })
  data: {
    user: IUser;
    token: string;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: ResponseError[];
}
