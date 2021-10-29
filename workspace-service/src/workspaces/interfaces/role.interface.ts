import { ObjectID } from 'typeorm';

export interface IRole {
  id: ObjectID;
  name: string;
  description?: string;
}
