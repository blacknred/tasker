export interface IUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
