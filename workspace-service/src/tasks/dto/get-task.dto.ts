import { IsMongoId } from 'class-validator';
import { IsAgentDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';

export class GetTaskDto extends IsAgentDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
