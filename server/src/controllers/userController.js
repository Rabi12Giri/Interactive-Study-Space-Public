import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import { sendSuccessResponse } from '../helpers/index.js';
import { User } from '../schemaModels/model.js';
import { deleteFile } from '../utils/index.js';

import { asyncErrorHandler, throwError } from '../helpers/index.js';

export const addUser = asyncErrorHandler(async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    throwError({
      message: 'User data is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  //   Checking if any info is missing
  const propertiesToCheck = [
    'fullName',
    'email',
    'phoneNumber',
    'address',
    'password',
  ];

  if (propertiesToCheck.some((prop) => !userInfo[prop])) {
    throwError({
      message: 'All fields are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  //   Checking is user already exists
  const isUserExists = await User.findOne({ email: userInfo.email });

  if (isUserExists) {
    throwError({
      message: 'User already exists',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  //   Storing user info
  let user = new User({ ...userInfo });

  await user.save();

  sendSuccessResponse({
    res,
    message: 'User is registered successfully',
  });
});

export const getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find(
    {},
    { password: false, isAutoGeneratedPasswordChanged: false, OTP: false }
  ).sort({
    createdAt: -1,
  });

  sendSuccessResponse({
    res,
    data: users,
    message: 'All users are fetched successfully',
  });
});

export const deleteUser = asyncErrorHandler(async (req, res) => {
  const userID = req.params.userID;

  // checking if user id is valid mongoose _id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    throwError({
      message: 'User does not exists',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const user = await User.findByIdAndDelete(userID);

  if (!user) {
    throwError({
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'User is deleted successfully',
  });
});

export const updateUser = asyncErrorHandler(async (req, res) => {
  let userInfo = req.body;
  const userID = req.params.userID;

  // checking if user id is valid mongoose _id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    throwError({
      message: 'User does not exists',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (!userInfo) {
    throwError({
      message: 'User info is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  let user = await User.findById(userID);

  if (!user) {
    throwError({
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Making sure that email cannot be changed
  if (userInfo.email && user.email !== userInfo.email) {
    throwError({
      message: 'Email cannot be changed',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  // Merging the initial user details with new updated details
  Object.assign(user, userInfo);

  // Saving the updated user details
  user = await user.save();

  sendSuccessResponse({
    res,
    data: user,
    message: 'User details are updated successfully',
  });
});

export const getUserByID = asyncErrorHandler(async (req, res) => {
  const userID = req.params.userID;

  // checking if user id is valid mongoose _id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    throwError({
      message: 'User does not exists',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  let user = await User.findById(userID);

  if (!user) {
    throwError({
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: user,
    message: 'User detail is fetched successfully',
  });
});
