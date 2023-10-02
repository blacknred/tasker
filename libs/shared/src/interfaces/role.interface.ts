import { WorkspacePolicy } from '../enums';
import { ID } from './base.interface';

export interface IRole {
  workspaceId: ID;
  name: string;
  details?: string;
  color?: string;
  policies: WorkspacePolicy[];
}
