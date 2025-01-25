import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserControllers } from "./user.controller";

const adminRouter = Router();

adminRouter.get("/users", auth("admin"), UserControllers.getAllUsers);

adminRouter.patch("/users/:id/block", auth("admin"), UserControllers.blockUser);

adminRouter.delete("/blogs/:id", auth("admin"), UserControllers.deleteBlog);

export const UsersRouter = { adminRouter };
