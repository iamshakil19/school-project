import { IUser } from './user.interface';
import { User } from './user.model';

export const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

export const login = async (email: string) => {
  return await User.findOne({ email });
};

export const UserService = {
  createUser,
  login,
};
