import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  const initialValues: SignInFormValues = { email: "", password: "" };

  return (
    <div className="container mx-auto text-center">
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="grid grid-cols-1 gap-4 w-full lg:w-2/6">
          <h2 className="text-2xl font-bold">Bot Maker</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid gap-3 bg-white text-left px-10 py-5 rounded-md">
                  <h5 className="text-xl text-center">Sign In</h5>
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
        </div>
      </div>
    </div>
  );
}
