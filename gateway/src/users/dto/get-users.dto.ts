import { OmitType, PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['password'] as const)),
  PaginationDto,
) {}
