import { ProjectPermission } from '../enums';
import { IAccount } from './account.interface';
import type { ID } from './base.interface';

export interface IAuth {
  userId: ID;
  permissions: Record<ID, ProjectPermission[]>;
}

export interface IAuthExtended
  extends IAuth,
    Pick<IAccount, 'name' | 'image' | 'locale'> {
  vapidPublicKey?: string;
}
