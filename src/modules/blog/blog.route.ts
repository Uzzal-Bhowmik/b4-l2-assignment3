import { Router } from "express";
import { BlogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";

const router = Router();

router.get("/", BlogControllers.getAllBlogs);

router.post(
  "/",
  auth("admin", "user"),
  validateRequest(BlogValidations.createBlogSchema),
  BlogControllers.createBlog,
);

router.patch(
  "/:id",
  auth("admin", "user"),
  validateRequest(BlogValidations.updateBlogSchema),
  BlogControllers.updateBlog,
);

router.delete("/:id", auth("admin", "user"), BlogControllers.deleteBlog);

export const BlogRouter = router;
