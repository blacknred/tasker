import { SearchEntryType } from '../enums';
import type { ID } from './base.interface';

export interface ISearchEntry {
  id: ID;
  projectId?: string;
  userId?: string;
  type: SearchEntryType;
  text: string;
  isActive: boolean;
}

export type IHydratedSearchEntry = ISearchEntry;
