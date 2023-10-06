import { ID } from './base.interface';

export interface IAuth {
  userId: ID;
  workspaceId: ID;
  permissions: string[];
}
