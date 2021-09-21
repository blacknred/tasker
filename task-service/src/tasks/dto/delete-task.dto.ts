import { ObjectID } from 'typeorm';

export class DeleteTaskDto {
  id: ObjectID;
  userId: number;
}
