import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: "API not found!!",
    error: null,
  });
};

export default notFound;
