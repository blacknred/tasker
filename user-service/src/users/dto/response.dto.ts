import { HttpStatus } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

export class ValidationError {
  field: string;
  message: string;
}

export class Pagination<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export class ResponseDto<T = null> {
  status: HttpStatus;
  errors?: ValidationError[];
  data?: T;
}

export class UserResponseDto extends ResponseDto<IUser> {}

export class UsersResponseDto extends ResponseDto<Pagination<IUser>> {}
