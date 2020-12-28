import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { checkRegisterFields } from "../../utils/validatorWrapper";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    await checkRegisterFields({ username, email, password });
    return next();
  } catch (err) {
    return next(err);
  }
};
