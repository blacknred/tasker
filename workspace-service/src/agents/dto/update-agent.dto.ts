import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateAgentDto } from './create-agent.dto';

export class UpdateAgentDto extends PartialType(
  OmitType(CreateAgentDto, ['userId']),
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
