import { verifyAccessToken } from "@/utils/jwt";
import { errorResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers["authorization"];

  if (!authheader || !authheader.startsWith("Bearer ")) {
    errorResponse(res, 401, "Unauthorized.");
  } else {
    const token = authheader.split(" ")[1];
    try {
      const decoded = verifyAccessToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      errorResponse(res, 401, "Unauthorized");
    }
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      errorResponse(res, 403, "Forbidden.");
    } else {
      next();
    }
  };
};
