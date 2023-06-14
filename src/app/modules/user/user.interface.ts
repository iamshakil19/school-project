import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
