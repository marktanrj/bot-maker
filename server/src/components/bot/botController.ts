import { NextFunction, Request, Response } from "express";
import { fromPairs } from "lodash";
import { getConnection } from "typeorm";
import botmaker from "../../botmaker/logic/main";
import { Bot } from "../../entity/Bot";

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botData } = req.body;
  const repository = await getConnection().getRepository(Bot);

  const bot = repository.create({
    jsonData: JSON.stringify(botData),
    user: req.body.user,
    name: "",
    token: "",
  });

  await repository.save(bot);

  return res.status(200).json({ id: bot.id, botData: botData });
};

export const save = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botData, botId, botName, botToken } = req.body;
  const repository = await getConnection().getRepository(Bot);

  const bot = await repository.createQueryBuilder("bot").where("bot.id = :id", { id: botId }).getOne();
  if (bot) {
    bot.jsonData = JSON.stringify(botData);
    bot.name = botName;
    bot.token = botToken;
    await repository.save(bot);
  } else {
    return res.status(400).json({ message: "Bot does not exist" });
  }

  next();
  return res.sendStatus(200);
};

export const load = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botId } = req.query;
  const repository = await getConnection().getRepository(Bot);

  const bot = await repository.createQueryBuilder("bot").where("bot.id = :id", { id: botId }).getOne();
  if (!bot) {
    return res.status(400).json({ message: "Bot does not exist" });
  }

  const botData = JSON.parse(bot.jsonData);
  const botName = bot.name;
  const botToken = bot.token;

  return res.status(200).json({ botData, botName, botId, botToken });
};

export const build = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botData, botName, botToken } = req.body;
  // const repository = await getConnection().getRepository(User);

  const file = botmaker({ botData, botName, botToken });
  console.log(file);
  return res.sendStatus(200);
};

export const deleteBot = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botId } = req.body;
  const user = req.body.user;

  try {
    const repository = await getConnection().getRepository(Bot);
    const bot = await repository.findOne({ id: botId }, { relations: ["user"] });
    if (bot.user.id !== user.id) {
      return res.status(401).json({ message: "Unauthorized to delete bot" });
    }
    await repository.delete(botId);
  } catch (err) {
    return res.status(404).json({ message: "Error deleting bot" });
  }

  return res.sendStatus(200);
};

export const getBotsList = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const botRepository = await getConnection().getRepository(Bot);
  const user = req.body.user;

  let bots;
  try {
    bots = await botRepository
      .createQueryBuilder("bot")
      .select(["bot.id", "bot.name", "bot.createdDate", "bot.updatedDate"])
      .where("bot.user.id = :id", { id: user.id })
      .getMany();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error" });
  }
  return res.status(200).json(bots);
};
