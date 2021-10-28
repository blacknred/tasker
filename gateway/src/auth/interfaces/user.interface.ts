export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: [UserRole];
  createdAt: number;
  updatedAt: number;
}
