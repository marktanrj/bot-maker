import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

export const register = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password } = req.body;
  console.log(username);
};
