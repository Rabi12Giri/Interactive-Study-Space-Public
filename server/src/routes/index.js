import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './authRoutes.js';
import notebookRouter from './notebookRoutes.js';
import noteRouter from './noteRoutes.js';

const apiRouter = express.Router();

const apiRoutes = [
  {
    router: userRouter,
    path: '/users',
  },
  {
    router: authRouter,
    path: '/auth',
  },
  {
    router: notebookRouter,
    path: '/notebooks',
  },
  {
    router: noteRouter,
    path: '/notes',
  },
];

apiRoutes.forEach((route) => apiRouter.use(route.path, route.router));

export default apiRouter;
