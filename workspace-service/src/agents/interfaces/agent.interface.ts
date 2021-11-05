import { IRole } from 'src/roles/interfaces/role.interface';
import { ObjectID } from 'typeorm';

export interface IAgent {
  id: ObjectID;
  userId: number;
  userName: string;
  avatar?: string;
  createdAt: Date;
  role?: Partial<IRole>;
  workspaceId: ObjectID; //?
}
