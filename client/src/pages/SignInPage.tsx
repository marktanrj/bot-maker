import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignInPage() {
  const initialValues: SignInFormValues = { email: "", password: "" };

  return (
    <div className="container mx-auto text-center">
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-2/6">
          <h2 className="text-2xl font-bold">Bot Maker</h2>
          <div className="bg-white text-left px-10 py-5 rounded-md">
            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }}
            >
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
                      <p>Email Address</p>
                      <Field id="email" name="email" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                    </div>
                    <div>
                      <p>Password</p>
                      <Field id="password" name="password" required className="w-full p-1 border border-gray-500 rounded" />
                      {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}
                    </div>
                    <button className="rounded-md p-1 bg-red-500 text-white hover:bg-red-700 focus:outline-none transition ease-out duration-500 transform hover:scale-105">
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
