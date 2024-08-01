import express from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";

const apiRouter = express.Router();

const apiRoutes = [
  {
    router: userRouter,
    path: "/users",
  },
  {
    router: authRouter,
    path: "/auth",
  },
];

apiRoutes.forEach((route) => apiRouter.use(route.path, route.router));

export default apiRouter;
