import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumberString, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class SortingDto {
  @IsString({ message: 'Must be a string' })
  field: string;
  @IsString({ message: 'Must be a string' })
  direction: string;
}

export class GetUsersDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @IsNumberString({}, { message: 'Must be an number' })
  limit: number;
  @IsString({ message: 'Must be a string' })
  cursor: string;
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  sorting?: SortingDto;
}
