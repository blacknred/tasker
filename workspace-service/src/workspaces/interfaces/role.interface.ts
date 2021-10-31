export enum BaseRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
}
export interface IRole {
  name: string;
  description?: string;
}
