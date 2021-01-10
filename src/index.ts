import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createConnection, getConnectionManager } from "typeorm";
import _ from "lodash";
import logger from "./utils/loggerWrapper";
import helmet from "helmet";

import errorHandler from "./handlers/errorHandler";
import userRoute from "./components/user/userRoute";
import botRoute from "./components/bot/botRoute";

const PORT = 4000;

const main = async () => {
  const connection = await createConnection();
  logger.verbose("Connected to database!");

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  app.use("/user", userRoute);
  app.use("/bot", botRoute);

  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.verbose(`app is listening to port ${PORT}`);
  });
};

main().catch((err) => {
  logger.error("[Error]", err);
});
