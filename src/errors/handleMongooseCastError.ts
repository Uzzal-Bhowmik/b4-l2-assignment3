import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/errors";
import { StatusCodes } from "http-status-codes";

const handleMongooseCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Cast Error",
    error: {
      errorSources,
    },
  };
};

export default handleMongooseCastError;
