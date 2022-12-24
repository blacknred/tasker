import {
  PaginatedResponseDto,
  ResponseDto,
} from '../../__shared__/dto/response.dto';
import { IUser } from '../interfaces/user.interface';

export class UserResponseDto extends ResponseDto<Partial<IUser>> {}

export class UsersResponseDto extends PaginatedResponseDto<Partial<IUser>> {}
