import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { CLIENT_URL, FROM_EMAIL } from '../config/config.js';
import { HttpStatus } from '../constant/constants.js';
import { ExpiredTokenStore, User } from '../schemaModels/model.js';
import { generateAuthToken, sendMail } from '../utils/index.js';

import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';

export const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throwError({
      message: 'Email and password required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Comparing the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throwError({
      message: 'Wrong email or password',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  // Cannot send password to frontend because of security issues
  const userInfoForToken = { _id: user._id, email };

  const authToken = generateAuthToken(userInfoForToken);

  user.password = null;

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: `Authentication successful`,
    data: {
      user: user,
      token: authToken,
    },
  });
});

export const changePassword = asyncErrorHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const email = req.email;

  if (!email || !currentPassword || !newPassword) {
    throwError({
      message: 'Current password and new password are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Comparing the password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throwError({
      message: 'Wrong password, please check your password',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  user.password = newPassword;

  await user.save();

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: 'Password has been changed successfully',
  });
});

export const resetPassword = asyncErrorHandler(async (req, res) => {
  const newPassword = req.body.newPassword;
  const authToken = req.authToken;
  const userInfo = req.user;

  console.log(newPassword);

  if (!newPassword) {
    throwError({
      message: 'New Password is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  if (!userInfo || !authToken) {
    throwError({
      message: 'User info and auth token is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email: userInfo.email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  user.password = newPassword;

  await user.save();

  sendSuccessResponse({
    res,
    message: 'Password is changed successfully',
    statusCode: HttpStatus.OK,
  });
});

export const sendPasswordResetEmail = asyncErrorHandler(async (req, res) => {
  const email = req.body.email;

  if (!email) {
    throwError({
      message: 'Email is required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: 'User does not exist with this email address',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const token = generateAuthToken(
    {
      _id: user._id,
      email: email,
    },
    '10m'
  );

  const mailMessage = {
    from: FROM_EMAIL,
    to: user.email, // Can be a single email or an array of emails
    subject: 'Password Reset Request',
    html: `
    <p>Dear ${user.fullName},</p>
    <p>You have requested to reset your password. Please click the link below to reset your password:</p>
    <p><a href='${CLIENT_URL}/reset-password?token=${token}'>Reset Password</a></p>

    <p>Best regards,</p>
    <p>The hotel management System</p>
  `,
  };

  await sendMail(mailMessage);

  sendSuccessResponse({
    res,
    message: 'Your OPT code has been sent to mail. Please check it',
    statusCode: HttpStatus.OK,
  });
});
