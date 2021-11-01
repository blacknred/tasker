export enum Privilege {
  CREATE_TASK = 'CREATE_TASK',
  READ_ANY_TASK = 'READ_ANY_TASK',
  EDIT_ANY_TASK = 'EDIT_TASK',
  DELETE_ANY_TASK = 'DELETE_TASK',
  CREATE_SAGA = 'CREATE_SAGA',
  READ_ANY_SAGA = 'READ_ANY_SAGA',
  EDIT_ANY_SAGA = 'EDIT_ANY_SAGA',
  DELETE_ANY_SAGA = 'DELETE_ANY_SAGA',
  EDIT_WORKSPACE = 'EDIT_WORKSPACE',
}

export interface IRole {
  name: string;
  description?: string;
  privileges: Privilege[];
}
