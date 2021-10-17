import { PickType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto {
  @IsNumber({}, { message: 'Must be a number' })
  id: number;
}

export class GetValidatedUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
