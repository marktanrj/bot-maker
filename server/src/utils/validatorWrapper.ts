import * as yup from "yup";
import { ValidationError } from "yup";

export class ValidatorWrapperError extends Error {
  errors: string[];

  constructor(errors: string[]) {
    super();
    this.errors = errors;
  }
}

export const checkRegisterFields = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<void | Error> => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  try {
    await schema.validate(
      {
        username,
        email,
        password,
      },
      { abortEarly: false },
    );
  } catch (err) {
    throw new ValidatorWrapperError((<ValidationError>err).errors);
  }
};

export const checkSignInFields = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}): Promise<void | Error> => {
  const schema = yup.object().shape({
    identifier: yup.string().required(),
    password: yup.string().required(),
  });

  try {
    await schema.validate(
      {
        identifier,
        password,
      },
      { abortEarly: false },
    );
  } catch (err) {
    throw new ValidatorWrapperError((<ValidationError>err).errors);
  }
};
