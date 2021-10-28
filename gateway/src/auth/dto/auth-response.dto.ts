import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { UserRole } from '../interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';

export const authMock = {
  id: 1,
  name: 'testname',
  roles: [UserRole.USER],
  email: 'test@email.com',
  vapidPublicKey: 'Bsr56...',
};

export class AuthResponseDto extends ResponseDto {
  @ApiProperty({ example: authMock })
  data: Omit<IAuth, 'pushSubscriptions'> & { vapidPublicKey?: string };
}
