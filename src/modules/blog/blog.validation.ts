import { z } from "zod";

const createBlogSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Blog title is required" })
      .min(1, "Blog title is required"),
    content: z
      .string({ required_error: "Blog content is required" })
      .min(1, "Blog content is required"),
  }),
  // .strict(),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
  // .strict(),
});
export const BlogValidations = {
  createBlogSchema,
  updateBlogSchema,
};
