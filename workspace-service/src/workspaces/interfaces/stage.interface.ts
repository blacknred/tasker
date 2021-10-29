import { ObjectID } from 'typeorm';

export interface IStage {
  id: ObjectID;
  name: string;
  description?: string;
}
