import type { ID } from './base.interface';

enum SearchRecordType {
  PROJECT = 'PROJECT',
  ISSUE = 'ISSUE',
  SPRINT = 'SPRINT',
  USER = 'USER',
  BOARD = 'BOARD',
}

export interface ISearchRecord {
  id: ID;
  projectId: string;
  type: SearchRecordType;
  name: string;
}
