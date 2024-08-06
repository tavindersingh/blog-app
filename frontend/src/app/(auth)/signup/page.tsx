"use client";

import { SignupSchema } from "@/helpers/validationSchema";
import useAuth from "@/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignupPage = () => {
  const router = useRouter();
  const { signup } = useAuth();

  const handleLogin = async (
    e: FormEvent<HTMLFormElement> & {
      name: string;
      email: string;
      password: string;
    }
  ) => {
    const name = e.name;
    const email = e.email;
    const password = e.password;

    const response = await signup(name, email, password);

    if (response) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col border rounded p-4 space-y-5">
              <div>
                <h3 className="text-3xl font-bold">Signup</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your details to create new account
                </p>
              </div>
              <div>
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border px-4 py-2 rounded-lg mt-1"
                />
                {errors.name && touched.name ? (
                  <div className="text-xs text-red-500 mt-1">{errors.name}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="w-full border px-4 py-2 rounded-lg mt-1"
                />
                {errors.email && touched.email ? (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="pb-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="w-full border px-4 py-2 rounded-lg mt-1"
                />
                {errors.password && touched.password ? (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </div>
                ) : null}
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg duration-200"
                >
                  Signup
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
