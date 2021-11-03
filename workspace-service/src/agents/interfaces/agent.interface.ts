import { IRole } from 'src/workspaces/interfaces/role.interface';
import { ObjectID } from 'typeorm';

export interface IAgent {
  id: ObjectID;
  workspaceId: ObjectID;
  userId: number;
  userName: string;
  createdAt: Date;
  role?: IRole;
}
