import express from 'express';
import {
    changePassword,
    login,
    resetPassword,
    sendPasswordResetEmail
} from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.route('/login').post(login);

// Changing password using old password
authRouter.route('/change-password').post(authenticateToken, changePassword);

// Changing the auto generated password on the first log in request
authRouter.route('/reset-password').post(authenticateToken, resetPassword);

// Generate OTP
authRouter.route('/send-pw-reset-email').post(sendPasswordResetEmail);

export default authRouter;
