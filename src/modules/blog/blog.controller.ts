import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const getAllBlogs = catchAsync(async (req, res) => {
  const baseQuery = req.query;
  const result = await BlogServices.getAllBlogsFromDB(baseQuery);

  sendResponse(res, {
    success: true,
    message: "Blogs fetched successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;

  const result = await BlogServices.insertBlogIntoDB(user, payload);

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const payload = req.body;

  const result = await BlogServices.updateBlogIntoDB(blogId, payload);

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  const result = await BlogServices.deleteBlogFromDB(blogId);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: StatusCodes.OK,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
