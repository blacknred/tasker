import type { IBase, ID } from './base.interface';

export interface IWorkspace extends IBase {
  name: string;
  details?: string;
  ownerId: ID;
  totp: boolean;
  url: string;
  isActivated: boolean;
  isUnlimited: boolean;
}
