"use client";

import { LoginSchema } from "@/helpers/validationSchema";
import useAuth from "@/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: any) => {
    const email = e.email;
    const password = e.password;

    const response = await login(email, password);

    if (response) {
      showSuccessToast();
      router.replace("/dashboard");
    } else {
      showErrorToast();
    }
  };

  const showSuccessToast = () => {
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const showErrorToast = () => {
    toast.error("Invalid credentials", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full max-w-md">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col border rounded p-4 space-y-5">
              <div>
                <h3 className="text-3xl font-bold">Login</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your details to login
                </p>
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
                  Login
                </button>
              </div>
              <Link
                className="text-sm text-center text-blue-500"
                href="/signup"
              >
                Create New Account...
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
