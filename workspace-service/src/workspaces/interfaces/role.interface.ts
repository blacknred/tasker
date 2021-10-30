export enum BASE_ROLE {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}
export interface IRole {
  name: string;
  description?: string;
}
