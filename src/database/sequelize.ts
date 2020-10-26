import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("botmaker", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
