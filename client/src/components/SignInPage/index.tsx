import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../store/store";
import { setToast } from "../../store/slices/toastSlice";
import { signInUser } from "../../store/slices/userSlice";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
import { unwrapResult } from "@reduxjs/toolkit";

interface SignInFormValues {
  identifier: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  identifier: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const initialValues: SignInFormValues = { identifier: "", password: "" };

  const loadingSignIn = useSelector((state: RootState) => state.userReducer.loadingSignIn);

  const onSubmit = async ({ identifier, password }: SignInFormValues) => {
    try {
      const response = await dispatch(signInUser({ identifier, password })).then(unwrapResult);
      history.push("/dashboard");
    } catch (err) {
      dispatch(setToast({ type: "error", message: err }));
    }
  };

  return (
    <div className="container mx-auto text-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-2/6">
          <h2 className="text-2xl font-bold">Bot Maker</h2>
          <div className="bg-white text-left px-10 py-5 rounded-md">
            <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={onSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <div className="grid gap-3">
                    <div className="text-center flex justify-center mr-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="25px">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <h5 className="text-xl">Sign In</h5>
                    </div>
                    <div>
                      <p>Email or Username</p>
                      <Field id="identifier" name="identifier" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.identifier && touched.identifier ? <div className="text-red-500">{errors.identifier}</div> : null}
                    </div>
                    <div>
                      <p>Password</p>
                      <Field id="password" name="password" type="password" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}
                    </div>
                    <button className="rounded-md p-1 bg-red-500 text-white hover:bg-red-700 focus:outline-none transition ease-out duration-500 transform hover:scale-105">
                      <SpinnerComponent loading={loadingSignIn} />
                      Sign in
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="text-right mt-5">
              <Link to="/register" className="hover:text-red-500">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
