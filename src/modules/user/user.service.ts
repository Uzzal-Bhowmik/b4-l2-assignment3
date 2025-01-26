import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "./user.model";
import { Blog } from "../blog/blog.model";

const fetchAllUsersFromDB = async (baseQuery: Record<string, unknown>) => {
  const userFindQuery = new QueryBuilder(
    User.find().select("-password"),
    baseQuery,
  ).filter();

  const result = await userFindQuery.modelQuery;

  return result;
};

const blockUserIntoDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User is not found!");
  }

  await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
    },
  );

  return null;
};

const deleteBlogFromDB = async (blogId: string) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog is not found!");
  }

  await Blog.findByIdAndUpdate(
    blogId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
};

export const UserServices = {
  fetchAllUsersFromDB,
  blockUserIntoDB,
  deleteBlogFromDB,
};
