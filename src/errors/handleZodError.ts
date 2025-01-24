import { ZodError } from "zod";
import { TGenericErrorResponse } from "../interface/errors";
import { StatusCodes } from "http-status-codes";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const error = {
    errorSources: err?.issues?.map((issue) => ({
      path: issue.path[issue.path.length - 1] as string,
      message: issue.message,
    })),
  };

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    error,
  };
};

export default handleZodError;
