import type { ID } from './base.interface';

export interface ISession {
  userId: ID;
  projectIds: ID[];
}
