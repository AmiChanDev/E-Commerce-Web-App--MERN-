import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    //check for token in Auth header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    //check if token exists
    if (!token) {
      res.status(401).json({
        status: "error",
        message: "Not authorized, no token provided",
      });
      return;
    }

    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      //get user from token
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401).json({
          status: "error",
          message: "User not found!",
        });
        return;
      }

      //Attach user to request
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: "Not authorized, token failed",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error in authentication",
    });
    return;
  }
};

// Optional auth - continues even if no token
export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
        };
        const user = await User.findById(decoded.id).select("-password");
        if (user) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, but continue anyway
      }
    }

    next();
  } catch (error) {
    next();
  }
};
