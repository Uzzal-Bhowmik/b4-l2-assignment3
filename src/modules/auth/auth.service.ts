import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogin, TRegister } from "./auth.interface";
import bcrypt from "bcrypt";
import { generateToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

const register = async (payload: TRegister) => {
  const resultRegisteringUser = await User.create(payload);

  // Show only name, email fields to client
  if (resultRegisteringUser) {
    const user = await User.findById(resultRegisteringUser?._id).select(
      "name email",
    );

    return user;
  }

  return resultRegisteringUser;
};

const login = async (payload: TLogin) => {
  const { email, password } = payload;

  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExists.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password does not match!");
  }

  const jwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  } as JwtPayload;

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    token: accessToken,
    // refreshToken,
  };
};

export const AuthServices = { register, login };
