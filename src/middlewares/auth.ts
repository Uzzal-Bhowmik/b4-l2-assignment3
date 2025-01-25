import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    // separate token from bearer
    if (token.includes("Bearer")) {
      token = token.split(" ")[1];
    }

    // check if token has expired
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, role } = decoded;

    // Check if user valid
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User is not found!!");
    }

    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, "User is blocked!!");
    }

    if (user.isDeleted) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is already deleted!!");
    }

    // Check if given role has access
    if (requiredRoles?.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    // Set user req obj
    req.user = decoded;

    next();
  });
};

export default auth;
