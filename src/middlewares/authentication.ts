import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
