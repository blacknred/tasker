import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(CreateUserDto) {
  limit: number;
  cursor: string;
}
