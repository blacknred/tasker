import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { CreateAgentDto } from './create-member.dto';

export class UpdateAgentDto extends IntersectionType(
  PartialType(OmitType(CreateAgentDto, ['userId'])),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;
}
