import * as Yup from "yup";

export const passwordPattern =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

export const validationSchemaResetPassword = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      new RegExp(passwordPattern),
      "At least 8 character and in (e.g., Example1!) format"
    ),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(
      new RegExp(passwordPattern),
      "At least 8 character and in (e.g., Example1!) format"
    ),
});
