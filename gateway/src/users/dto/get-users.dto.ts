import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { PaginatedRequestDto } from 'src/__shared__/dto/request.dto';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends IntersectionType(
  PaginatedRequestDto,
  PartialType(OmitType(CreateUserDto, ['password'])),
) {}
