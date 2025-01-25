import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { BlogRouter } from "../modules/blog/blog.route";
import { UsersRouter } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/blogs",
    route: BlogRouter,
  },
  {
    path: "/admin",
    route: UsersRouter.adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const RootRouter = router;
