import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { throwError } from "../utils/createError.js";
import { HttpStatus } from "../constant/constants.js";

export let isAdmin = asyncErrorHandler((req, res, next) => {
  const { role } = req.user;

  if (role === "admin") {
    next();
  }

  throwError({
    message: "You are not authorized",
    statusCode: HttpStatus.UNAUTHORIZED,
  });
});
