import { WorkspacePolicy } from '../enums';
import { ID } from './base.interface';

export interface IAuth {
  userId: ID;
  workspaceId: ID;
  policies: WorkspacePolicy[];
  projects: ID[];
}
