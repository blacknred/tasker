import { WorkspacePolicy } from '../enums';
import { IBase, ID } from './base.interface';

export interface IRole extends IBase {
  workspaceId: ID;
  name: string;
  details?: string;
  color?: string;
  rank: number;
  policies: WorkspacePolicy[];
}
