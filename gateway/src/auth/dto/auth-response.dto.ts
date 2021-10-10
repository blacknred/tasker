import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Role } from '../../users/interfaces/user.interface';
import { IAuthData } from '../interfaces/authed-request.interface';

export const authExample = {
  id: 1,
  roles: [Role.USER],
  vapidPublicKey: 'Bsr56...',
};

export class AuthResponseDto extends ResponseDto {
  @ApiProperty({ example: authExample })
  data: IAuthData;
}
