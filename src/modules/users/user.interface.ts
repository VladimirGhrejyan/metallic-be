export interface IUser {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
