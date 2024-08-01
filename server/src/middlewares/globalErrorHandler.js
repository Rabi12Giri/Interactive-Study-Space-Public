// this middleware handles the error globally
const handleError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  console.log(error);

  res.status(error.statusCode).json({
    status: error.statusCode || 500,
    message: error.message,
  });
  next();
};

export default handleError;
