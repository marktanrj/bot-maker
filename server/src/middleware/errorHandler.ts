import { logger } from "../utils/loggerWrapper";
import express, { Request, Response, NextFunction } from "express";
import { validatorWrapperError } from "../utils/validatorWrapper";

export default async function (
  err: Error | typeof validatorWrapperError,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  logger.error(err);

  const isValidatorError = err instanceof validatorWrapperError;
  if (isValidatorError) {
    res.status(400).json({ errors: (<validatorWrapperError>err).errors });
  }
  res.sendStatus(400);
}
