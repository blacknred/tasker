import type { ID } from './base.interface';

export interface IFilter {
  id: ID;
  ownerId: ID;
  name: string;
  schema: string;
}
