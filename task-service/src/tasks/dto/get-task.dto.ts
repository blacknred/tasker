import { IsMongoId, IsNumber } from 'class-validator';
import { ObjectID } from 'typeorm';

export class GetTaskDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
  @IsNumber(null, { message: 'Must be an integer' })
  userId?: number;
}
