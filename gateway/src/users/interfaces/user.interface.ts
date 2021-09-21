export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: number;
  updatedAt: number;
}
