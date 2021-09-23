export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: [Role];
  createdAt: number;
  updatedAt: number;
}
