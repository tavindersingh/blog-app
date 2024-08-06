import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});
