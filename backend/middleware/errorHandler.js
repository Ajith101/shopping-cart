const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }

  if (err.name === "validationError") {
    message = Object.values(err.errors).map((value) => value.message);
    statusCode = 400;
  }

  if (err.code == 11000) {
    message = `Duplicate ${Object.keys(err.keyvalue)} entered`;
  }

  if (err.name === "JsonWebTokenError") {
    message = `Json web token is invalid`;
    statusCode = 400;
  }
  if (err.name === "TokenExpiredError") {
    message = `Json web token is expired`;
    statusCode = 400;
  }

  res.status(statusCode).json({ message });
};

module.exports = { notFound, errorHandler };
