import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleMongooseValidationError from "../errors/handleMongooseValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";
import config from "../config";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error properties
  let statusCode = 500; // internal_server_error
  let message = "Something went wrong!";

  let error = {
    errorSources: [
      {
        path: "",
        message,
      },
    ],
  };

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = handleZodError(err).statusCode;
    message = handleZodError(err).message;
    error = handleZodError(err).error;
  }

  // Mongoose validation error
  else if (err?.name === "ValidationError") {
    statusCode = handleMongooseValidationError(err).statusCode;
    message = handleMongooseValidationError(err).message;
    error = handleMongooseValidationError(err).error;
  }

  // Mongoose case error
  else if (err?.name === "CastError") {
    statusCode = handleMongooseValidationError(err).statusCode;
    message = handleMongooseValidationError(err).message;
    error = handleMongooseValidationError(err).error;
  }

  // Duplicate key error
  else if (err?.code === 11000) {
    statusCode = handleDuplicateError(err).statusCode;
    message = handleDuplicateError(err).message;
    error = handleDuplicateError(err).error;
  }

  // Checks if err is an instance of AppError/Error
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = {
      errorSources: [
        {
          path: "",
          message: err?.message,
        },
      ],
    };
  } else if (err instanceof Error) {
    message = err?.message;
    error = {
      errorSources: [
        {
          path: "",
          message: err?.message,
        },
      ],
    };
  }

  // Final error response to client
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
