export enum Privilege {
  EDIT_WORKSPACE = 'EDIT_WORKSPACE',
  CREATE_AGENT = 'CREATE_AGENT',
  READ_ANY_AGENT = 'READ_ANY_AGENT',
  EDIT_ANY_AGENT = 'EDIT_ANY_AGENT',
  DELETE_ANY_AGENT = 'DELETE_AGENT',
  CREATE_SAGA = 'CREATE_SAGA',
  READ_ANY_SAGA = 'READ_ANY_SAGA',
  EDIT_ANY_SAGA = 'EDIT_ANY_SAGA',
  DELETE_ANY_SAGA = 'DELETE_ANY_SAGA',
  CREATE_TASK = 'CREATE_TASK',
  READ_ANY_TASK = 'READ_ANY_TASK',
  EDIT_ANY_TASK = 'EDIT_ANY_TASK',
  DELETE_ANY_TASK = 'DELETE_TASK',
}

export enum BaseRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}

export interface IRole {
  name: string;
  privileges: string[];
}

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  stages: string[];
  labels: string[];
  roles: IRole[];
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}
