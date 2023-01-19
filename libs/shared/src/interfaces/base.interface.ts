export type ID = string;

export interface IBase {
  id: ID;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
