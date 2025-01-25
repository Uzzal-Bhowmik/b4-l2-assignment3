/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: any,
) => {
  const token = jwt.sign(
    {
      data: jwtPayload,
    },
    secret,
    { expiresIn },
  );

  return token;
};
