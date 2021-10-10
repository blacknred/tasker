import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { IUser } from '../interfaces/user.interface';
import { userMock } from './user-response.dto';

export class UsersResponseDto extends ResponseDto {
  @ApiProperty({ example: [userMock], nullable: true })
  data: IUser[];
}
