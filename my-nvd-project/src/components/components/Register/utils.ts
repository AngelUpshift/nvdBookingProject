import * as Yup from "yup";

export const passwordPattern =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

Yup.addMethod(Yup.string, "firstLetterUppercase", function (message) {
  return this.test("firstLetterUppercase", message, function (value) {
    const { path, createError } = this;
    if (value && value[0] !== value[0].toUpperCase()) {
      return createError({
        path,
        message: message || "First letter must be uppercase",
      });
    }
    return true;
  });
});

export const validationSchemaRegister = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .firstLetterUppercase("First name must start with a capital letter"),
  last_name: Yup.string()
    .required("Last name is required")
    .firstLetterUppercase("Last name must start with a capital letter"),
  team: Yup.string()
    .required("Team is required")
    .oneOf(["FND", "BND", "QA", "DESIGN", "HR", "PR"], "Invalid team"),
  squad: Yup.string()
    .required("Squad is required")
    .oneOf(["NETWATCH", "GIZMO", "NOVA"], "Invalid Squad"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      new RegExp(passwordPattern),
      "At least 8 character and in (e.g., Example1!) format"
    ),
});
