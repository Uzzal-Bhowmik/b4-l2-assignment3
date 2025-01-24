import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/errors";
import { StatusCodes } from "http-status-codes";

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: value.path,
      message: value.message,
    }),
  );

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    error: {
      errorSources,
    },
  };
};

export default handleMongooseValidationError;
