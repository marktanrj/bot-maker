import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import botmaker from "../../botmaker/logic/main";

export const save = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  // const { identifier, password } = req.body;
  // const repository = await getConnection().getRepository(User);
};

export const build = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { data } = req.body;
  // const repository = await getConnection().getRepository(User);

  const file = botmaker(data);
  console.log(file);
  return res.sendStatus(200);
};
