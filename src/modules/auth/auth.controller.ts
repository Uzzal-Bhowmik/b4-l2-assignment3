import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await AuthServices.register(payload);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await AuthServices.login(payload);

  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthControllers = { register, login };
