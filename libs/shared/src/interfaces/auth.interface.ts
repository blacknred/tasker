import { ProjectPermission } from '../enums';
import type { IAccount } from './account.interface';
import type { ID } from './base.interface';

export interface IAuth {
  userId: ID;
  permissions: Record<ID, ProjectPermission[]>;
}

export type IAuthExtended = IAuth & Pick<IAccount, 'name' | 'image' | 'locale'>;
