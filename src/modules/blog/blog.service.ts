import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import {
  allowedFieldsForCreateAndUpdateBlog,
  blogSearchableFields,
} from "./blog.constant";

const getAllBlogsFromDB = async (baseQuery: Record<string, unknown>) => {
  const blogsFindQuery = new QueryBuilder(
    Blog.find().populate({
      path: "author",
      model: "User",
      select: "-password",
    }),
    baseQuery,
  )
    .search(blogSearchableFields)
    .sort()
    .filter("author");

  const result = await blogsFindQuery.modelQuery;
  return result;
};

const insertBlogIntoDB = async (user: JwtPayload, payload: TBlog) => {
  // Set logged in user's id as author
  const blogData = { ...payload, author: user.userId };

  // Check if only title and content fields are present in payload
  const isAnyInvalidField = Object.keys(payload).filter(
    (key) => !allowedFieldsForCreateAndUpdateBlog.includes(key),
  );

  if (isAnyInvalidField?.length > 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Invalid fields: ${isAnyInvalidField}. Only title and content are valid inputs`,
    );
  }

  const result = (await Blog.create(blogData)).populate({
    path: "author",
    model: "User",
    select: "-password",
  });
  return result;
};

const updateBlogIntoDB = async (blogId: string, payload: Partial<TBlog>) => {
  const isBlogExists = await Blog.findById(blogId);

  if (!isBlogExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  // Check if updatable fields are correct
  const isAnyInvalidField = Object.keys(payload).filter(
    (key) => !allowedFieldsForCreateAndUpdateBlog.includes(key),
  );

  if (isAnyInvalidField?.length > 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Invalid fields to update: ${isAnyInvalidField}`,
    );
  }

  const result = await Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
  }).populate({
    path: "author",
    model: "User",
    select: "-password",
  });
  return result;
};

const deleteBlogFromDB = async (blogId: string) => {
  const isBlogExists = await Blog.findById(blogId);

  if (!isBlogExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }

  await Blog.findByIdAndUpdate(
    blogId,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return null;
};

export const BlogServices = {
  getAllBlogsFromDB,
  insertBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
