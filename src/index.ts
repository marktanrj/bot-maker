import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./database/sequelize";
import _ from "lodash";
import { logger } from "./config/logger";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.verbose("Connection has been established successfully");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

app.listen(5000, () => {
  logger.verbose("app is listening to port 5000 ");
});
