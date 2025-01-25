import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const baseQuery = req.query;

  const result = await UserServices.fetchAllUsersFromDB(baseQuery);

  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.id;

  await UserServices.blockUserIntoDB(userId);

  sendResponse(res, {
    success: true,
    message: "Users blocked successfully",
    statusCode: StatusCodes.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  await UserServices.deleteBlogFromDB(blogId);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
  });
});

export const UserControllers = {
  getAllUsers,
  blockUser,
  deleteBlog,
};
