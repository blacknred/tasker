export interface IUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
