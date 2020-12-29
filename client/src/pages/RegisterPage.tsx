import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../store/slices/userSlice";
import { setToast } from "../store/slices/toastSlice";
import { RootState } from "../store/store";
import SpinnerComponent from "../components/common/SpinnerComponent";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues: RegisterFormValues = { username: "", email: "", password: "", confirmPassword: "" };

  const loadingRegister = useSelector((state: RootState) => state.userReducer.loadingRegister);

  const onSubmit = async ({ username, email, password }: RegisterFormValues) => {
    const response: any = await dispatch(registerUser({ username, email, password }));
    if (response.error) {
      dispatch(setToast({ type: "error", message: response.payload }));
    } else {
      dispatch(setToast({ type: "success", message: "Account created" }));
      history.push("/");
    }
  };

  return (
    <div className="container mx-auto text-center">
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-2/6">
          <h2 className="text-2xl font-bold">Bot Maker</h2>
          <div className="bg-white text-left px-10 py-5 rounded-md">
            <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={onSubmit}>
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid gap-3">
                    <div className="text-center flex justify-center mr-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="30px">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h5 className="text-xl">Register</h5>
                    </div>
                    <div>
                      <p>Username</p>
                      <Field id="username" name="username" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.username && touched.username ? <div className="text-red-500">{errors.username}</div> : null}
                    </div>
                    <div>
                      <p>Email Address</p>
                      <Field id="email" name="email" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                    </div>
                    <div>
                      <p>Password</p>
                      <Field id="password" name="password" type="password" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}
                    </div>
                    <div>
                      <p>Confirm Password</p>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="w-full p-1 border border-gray-500 rounded"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-red-500">{errors.confirmPassword}</div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="rounded-md p-1 bg-red-500 text-white hover:bg-red-700 focus:outline-none transition ease-out duration-500 transform hover:scale-105"
                    >
                      <SpinnerComponent loading={loadingRegister} />
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="text-left mt-5">
              <Link to="/" className="hover:text-red-500">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
