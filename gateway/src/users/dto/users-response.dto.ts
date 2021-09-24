import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { IUser } from '../interfaces/user.interface';
import { userExample } from './user-response.dto';

export class UsersResponseDto extends ResponseDto {
  constructor() {
    super();
  }
  @ApiProperty({ example: [userExample], nullable: true })
  data: IUser[];
}
