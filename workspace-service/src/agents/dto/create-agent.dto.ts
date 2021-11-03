import { IsMongoId, IsNumber, IsString } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';

export class CreateAgentDto extends AccessDto {
  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;

  @IsString({ message: 'Must be a string' })
  userName: string;

  @IsMongoId({ message: 'Invalid identificator' })
  roleId: ObjectID;
}
