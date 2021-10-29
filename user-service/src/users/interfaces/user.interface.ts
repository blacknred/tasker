export interface IUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
