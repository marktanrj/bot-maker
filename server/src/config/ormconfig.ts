import { ConnectionOptions } from "typeorm";
import path from "path";

const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "botmaker",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "../entity/**/*{.ts,.js}")],
  migrations: [path.join(__dirname, "../migration/**/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "../subscriber/**/*{.ts,.js}")],
  cli: {
    entitiesDir: path.join(__dirname, "../entity"),
    migrationsDir: path.join(__dirname, "../migration"),
    subscribersDir: path.join(__dirname, "../subscriber"),
  },
};

export default config;
