import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '../app/modules/user/user.interface';
import config from '../config';

const generateToken = (userInfo: IUser) => {
  const payload = {
    email: userInfo.email,
  };

  const token = jwt.sign(payload, config.access_token_secret as Secret, {
    expiresIn: '7d',
  });

  return token;
};

export default generateToken;
