import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const BasicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email"),
  emailLogIn: yup.string().email("Please enter a valid email"),

  fname: yup
    .string()
    .min(3, "User name must be at least 3 characters long")
    .max(20, "User name must be 20 characters or less")
    .matches(
      /^[\p{L}0-9_]+$/u,
      "User name can only contain letters (Arabic/English), numbers, and underscores"
    ),

  lname: yup
    .string()
    .min(3, "User name must be at least 3 characters long")
    .max(20, "User name must be 20 characters or less")
    .matches(
      /^[\p{L}0-9_]+$/u,
      "User name can only contain letters (Arabic/English), numbers, and underscores"
    ),

  phone: yup
    .string()
    .matches(/^[0-9]{6,15}$/, "Phone number must be between 6 and 15 digits"),

  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" }),

  passwordLogIn: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" }),

  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
