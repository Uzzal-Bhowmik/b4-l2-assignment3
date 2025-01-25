import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginSchema),
  AuthControllers.login,
);

router.post(
  "/register",
  validateRequest(AuthValidations.registerSchema),
  AuthControllers.register,
);

export const AuthRouter = router;
