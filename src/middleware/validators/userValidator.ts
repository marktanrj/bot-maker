import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  try {
    await schema.validate(
      {
        username,
        email,
        password,
      },
      { abortEarly: false },
    );

    return next();
  } catch (err) {
    return next(err);
  }
};
