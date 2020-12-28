import * as yup from "yup";
import { ValidationError } from "yup";

interface registerFields {
  username: string;
  email: string;
  password: string;
}

export const validatorWrapperError = ValidationError;
export type validatorWrapperErrorType = ValidationError;

export const checkRegisterFields = async ({ username, email, password }: registerFields): Promise<void | Error> => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  await schema.validate(
    {
      username,
      email,
      password,
    },
    { abortEarly: false },
  );
};
