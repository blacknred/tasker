import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateTokenDto } from './create-token.dto';

export class GetTokensDto extends IntersectionType(
  PartialType(OmitType(CreateTokenDto, ['link', 'exist', 'dtl'])),
  PaginationDto,
) {
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
