import { logger } from "../util/logger";
import express, { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

export default async function (err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err);

  const isErrorFromYup = err instanceof ValidationError;
  if (isErrorFromYup) {
    res.status(400).json({ errors: (<ValidationError>err).errors });
  }
}
