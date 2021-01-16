import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);

    const repository = await getConnection().getRepository(User);
    const user = await repository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: _.get(decoded, "email", "") })
      .getOne();

    req.body.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
