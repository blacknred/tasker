import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { Role } from '../../users/interfaces/user.interface';
import { IAuthData } from '../interfaces/authed-request.interface';

export const authExample = {
  id: 1,
  roles: [Role.USER],
};

export class AuthResponseDto extends ResponseDto {
  constructor() {
    super();
  }
  @ApiProperty({ example: authExample, nullable: true })
  data?: IAuthData;
}
