import { ProjectPermission } from '../enums';
import type { ID } from './base.interface';

export interface IAuth {
  userId: ID;
  needTfa?: boolean;
  permissions: Record<ID, ProjectPermission[]>;
}
