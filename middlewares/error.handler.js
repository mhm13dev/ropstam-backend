const AppError = require("../utils/AppError");

const sendErrorDev = (err, req, res) => {
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    code: err.code,
    message: err.message,
    error: err,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.code,
      message: err.message,
    });
  }
  // Programming or other unknown error
  // 1) Log error
  console.error("ERROR 💥: ", err);

  // 2) Send generic message
  const response = {
    status: "error",
    code: "server_error",
    message: "Something went very wrong!",
  };
  return res.status(500).json(response);
};

// Handle MongoDB duplicate field error
function handleDuplicateFieldsDB(err) {
  const keys = Object.keys(err.keyValue);
  const message = `${
    keys[0][0].toUpperCase() + keys[0].slice(1)
  } is already used`;
  return new AppError("duplicate_key", message, 403);
}

// Universal Error Handler For Express
exports.errorHandler = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }
    sendErrorProd(err, req, res);
  }
};
