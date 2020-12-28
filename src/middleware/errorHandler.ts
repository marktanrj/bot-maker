import { logger } from "../utils/loggerWrapper";
import express, { Request, Response, NextFunction } from "express";
import { validatorWrapperError, validatorWrapperErrorType } from "../utils/validatorWrapper";

export default async function (
  err: Error | validatorWrapperErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err);

  const isValidatorError = err instanceof validatorWrapperError;
  if (isValidatorError) {
    res.status(400).json({ errors: (<validatorWrapperErrorType>err).errors });
  }
  res.sendStatus(400);
}
