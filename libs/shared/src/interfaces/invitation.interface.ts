import { ID } from './base.interface';

export interface IInvitation {
  email: string;
  roleId: ID;
  projectId: ID;
  endsAt: string | Date;
}
