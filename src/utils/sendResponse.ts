import { Response } from "express";
import { StatusCodes } from "http-status-codes";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode || 201).json({
    success: data.success,
    message: data.message,
    statusCode: data?.statusCode || 201,
    data: data.data,
  });
};

export default sendResponse;
