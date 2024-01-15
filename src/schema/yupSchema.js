import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required().min(4).max(15),
  password: yup.string().required().min(8).max(20),
  confirmPassword: yup
    .string()
    .required("confirm password is required field")
    .min(8, "must be at least 8 characters")
    .max(20, "must be at most 20 characters")
    .oneOf([yup.ref("password"), null], "password must match"),
});

export const loginSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required("email or username is required field")
    .min(4, "must be at least 4 characters"),
  password: yup.string().required().min(8).max(20),
});


export const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
})

export const resetPasswordSchema = yup.object({
  password: yup.string().required().min(8).max(20),
  confirmPassword: yup
    .string()
    .required("confirm password is required field")
    .min(8, "must be at least 8 characters")
    .max(20, "must be at most 20 characters")
    .oneOf([yup.ref("password"), null], "password must match"),
})