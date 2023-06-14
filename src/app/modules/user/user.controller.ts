/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import generateToken from '../../../helpers/token';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  if (result !== null) {
    const token = generateToken(result);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
      token: token,
    });
  } else {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'User creation failed'
    );
  }
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Please provide your credentials',
    });
  }

  const result = await UserService.login(email);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'No user found. Please create an account',
    });
  }
  if (result !== null) {
    const isPasswordValid = bcrypt.compareSync(password, result.password);

    if (!isPasswordValid) {
      sendResponse(res, {
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: 'Password is incorrect',
      });
    }

    const token = generateToken(result);
    const { password: pwd, ...others } = result.toObject();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: others,
      token: token,
    });
  } else {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Login failed');
  }
});

export const UserController = {
  createUser,
  login,
};
