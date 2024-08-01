import express from 'express';
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from '../controllers/userController.js';
import upload from '../middlewares/fileUpload.js';
import { authenticateToken } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.route('/').post(addUser).get(getAllUsers).patch().delete();

userRouter.use(authenticateToken);

userRouter
  .route('/:userID')
  .post()
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
