import "reflect-metadata";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createConnection } from "typeorm";
import _ from "lodash";
import { logger } from "./config/logger";
import helmet from "helmet";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

(async () => {
  try {
    const connection = await createConnection();
    logger.verbose("Connected to database!");
  } catch (err) {
    logger.error("[Error]", err);
  }
})();

app.listen(5000, () => {
  logger.verbose("app is listening to port 5000 ");
});
