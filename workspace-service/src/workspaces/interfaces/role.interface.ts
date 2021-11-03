import { ObjectID } from 'typeorm';

export enum Privilege {
  EDIT_WORKSPACE = 'EDIT_WORKSPACE',
  CREATE_AGENT = 'CREATE_AGENT',
  READ_ANY_AGENT = 'READ_ANY_AGENT',
  EDIT_ANY_AGENT = 'EDIT_ANY_AGENT',
  DELETE_ANY_AGENT = 'DELETE_ANY_AGENT',
  CREATE_TASK = 'CREATE_TASK',
  READ_ANY_TASK = 'READ_ANY_TASK',
  EDIT_ANY_TASK = 'EDIT_TASK',
  DELETE_ANY_TASK = 'DELETE_TASK',
  CREATE_SAGA = 'CREATE_SAGA',
  READ_ANY_SAGA = 'READ_ANY_SAGA',
  EDIT_ANY_SAGA = 'EDIT_ANY_SAGA',
  DELETE_ANY_SAGA = 'DELETE_ANY_SAGA',
}

export enum BaseRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}

export interface IRole {
  id: ObjectID;
  name: string;
  privileges?: Privilege[];
}
