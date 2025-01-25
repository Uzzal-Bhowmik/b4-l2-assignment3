import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return token;
};
