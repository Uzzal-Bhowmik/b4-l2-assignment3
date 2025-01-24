import { StatusCodes } from "http-status-codes";
import { TGenericErrorResponse } from "../interface/errors";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err?.message?.match(/\{.*?\}/); // find key
  const duplicateKey = match.length > 0 && match[0];

  const errorSources = [
    {
      path: "",
      message: `${duplicateKey} already exists!` || "Duplicate key error",
    },
  ];

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Duplicate Error",
    error: {
      errorSources,
    },
  };
};

export default handleDuplicateError;
