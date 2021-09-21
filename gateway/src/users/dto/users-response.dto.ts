import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
import { BaseResponseDto } from './empty-response.dto';
import { userExample } from './user-response.dto';

export class UsersResponseDto extends BaseResponseDto {
  @ApiProperty({ example: [userExample], nullable: true })
  data: IUser[];
}
