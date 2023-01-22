import type { ID } from './base.interface';

export enum IssueFilterField {
  ASSIGNEE_ID = 'ASSIGNEE_ID',
}

export interface IFilter {
  id: ID;
  ownerId?: ID;
  name: string;
  schema: string;
}

export type IHydratedFilter = IFilter;
