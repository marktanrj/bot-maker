import logger from "../utils/loggerWrapper";
import express, { Request, Response, NextFunction } from "express";
import { ValidatorWrapperError } from "../utils/validatorWrapper";

export default async function (
  err: Error | typeof ValidatorWrapperError,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  logger.error(err);

  const isValidatorError = err instanceof ValidatorWrapperError;
  if (isValidatorError) {
    res.status(400).json({ errors: (<ValidatorWrapperError>err).errors });
  }
  res.sendStatus(400);
}
