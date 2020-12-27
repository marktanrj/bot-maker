import winston from "winston";

export const logger = winston.createLogger({
  level: "verbose",
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
