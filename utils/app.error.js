class AppError extends Error {
  constructor(code, message, statusCode) {
    super(message);
    this.code = code; // e.g. ok, server_error, auth_error
    this.statusCode = statusCode; // e.g. 400, 401, 403
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // To indicate that the error is generated by developer

    Error.captureStackTrace(this, this.constructor); // Stack Trace of the error
  }
}

module.exports = AppError;
