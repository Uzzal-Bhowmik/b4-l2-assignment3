import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";

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
