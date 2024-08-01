// This function takes a controller function and handles the error if there is any while doing the operations
const asyncErrorHandler = (func) => {
    return (req, res, next) =>
        func(req, res, next).catch((error) => next(error));
};

export default asyncErrorHandler;
