import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  // try {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // } catch (err) {}

  const repository = await getConnection().getRepository(User);
  const user = new User();
  user.email = "test@gmail.com";
  user.username = "testusername";
  user.password = "123456";
  await repository.save(user);
  const allUsers = await repository.find();
  console.log(allUsers);
};
