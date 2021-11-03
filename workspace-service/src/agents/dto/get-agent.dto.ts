import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';

export class GetAgentDto extends AccessDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
