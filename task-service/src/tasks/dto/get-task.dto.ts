import { ObjectID } from 'typeorm';

export class GetTaskDto {
  id: ObjectID;
  userId?: number;
}
