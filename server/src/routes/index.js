import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './authRoutes.js';
import notebookRouter from './notebookRoutes.js';
import noteRouter from './noteRoutes.js';
import resourceRouter from './rourceRoutes.js';
import studySessionRouter from './studySessionRoutes.js';

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
  {
    router: resourceRouter,
    path: '/resources',
  },

  {
    router: studySessionRouter,
    path: '/sessions',
  },
];

apiRoutes.forEach((route) => apiRouter.use(route.path, route.router));

export default apiRouter;
