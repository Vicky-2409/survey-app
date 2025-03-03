import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../constants/http-status.enum";
import { Messages } from "../constants/messages.constant";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string };
    }
  }
}

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: Messages.MISSING_AUTH_TOKEN });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    ) as DecodedToken;
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: Messages.INVALID_AUTH_TOKEN });
  }
};
