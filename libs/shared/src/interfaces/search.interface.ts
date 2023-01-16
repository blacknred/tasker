import { SearchEntryType } from '../enums';
import type { ID } from './base.interface';

export interface ISearchEntry {
  id: ID;
  projectId: string;
  type: SearchEntryType;
  text: string;
}
