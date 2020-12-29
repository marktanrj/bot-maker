import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { username, email, password } = req.body;

  const repository = await getConnection().getRepository(User);

  const existingUserWithFields = await repository
    .createQueryBuilder("user")
    .where("user.username = :username OR user.email = :email", { username, email })
    .getOne();

  if (existingUserWithFields) {
    if (existingUserWithFields.username === username) {
      return res.status(409).json({
        errors: ["Username exists"],
      });
    }
    if (existingUserWithFields.email === email) {
      return res.status(409).json({
        errors: ["Email exists"],
      });
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    await repository.save(user);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      errors: [err.message],
    });
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { identifier, password } = req.body;

  const repository = await getConnection().getRepository(User);

  const user = await repository
    .createQueryBuilder("user")
    .where("user.username = :username OR user.email = :email", { username: identifier, email: identifier })
    .getOne();

  if (!user) {
    return res.status(409).json({
      errors: ["Either identifier or password incorrect"],
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({
      errors: ["Either identifier or password incorrect"],
    });
  }

  const userObject = { username: user.username, email: user.email };
  const token = jwt.sign(userObject, "10", { expiresIn: "7d" });
  const userObjectWithToken = { ...userObject, token };
  req.body.user = userObjectWithToken;

  return res.status(200).json({ user: userObjectWithToken });
};
