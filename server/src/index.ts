import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createConnection } from "typeorm";
import _ from "lodash";
import { logger } from "./util/logger";
import helmet from "helmet";

import userRoute from "./routes/userRoute";

const main = async () => {
  const connection = await createConnection();
  logger.verbose("Connected to database!");

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome");
  });

  app.use("/user", userRoute);

  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(400).send(err.message);
  });

  app.listen(5000, () => {
    logger.verbose("app is listening to port 5000 ");
  });
};

main().catch((err) => {
  logger.error("[Error]", err);
});
