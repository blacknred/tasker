import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { CreateAgentDto } from './create-agent.dto';

export class UpdateAgentDto extends IntersectionType(
  PartialType(OmitType(CreateAgentDto, ['userId'])),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
