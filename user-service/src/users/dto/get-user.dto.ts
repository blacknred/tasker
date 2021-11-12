import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends PartialType(
  OmitType(CreateUserDto, ['image', 'token']),
) {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  id?: number;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  partial?: boolean;
}
