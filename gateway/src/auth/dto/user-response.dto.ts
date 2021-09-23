import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { Role } from '../../users/interfaces/user.interface';
import { IAuthData } from '../interfaces/authed-request.interface';

export const userExample = {
  id: 1,
  name: 'username',
  email: 'test@test.com',
  roles: [Role.USER],
  createdAt: +new Date(),
  updatedAt: +new Date(),
};

export class UserResponseDto extends ResponseDto {
  @ApiProperty({ example: userExample, nullable: true })
  data?: IAuthData;
}
