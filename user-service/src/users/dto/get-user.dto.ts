import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  id?: number;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  partial?: boolean;
}
