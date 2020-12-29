import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const repository = await getConnection().getRepository(User);

  const existingUserWithFields = await repository
    .createQueryBuilder("user")
    .where("user.username = :username OR user.email = :email", { username, email })
    .getOne();

  console.log(existingUserWithFields);

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
  } catch (err) {
    return res.status(500).json({
      errors: [err.message],
    });
  }
};
