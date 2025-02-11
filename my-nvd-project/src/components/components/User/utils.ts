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

export const validationSchemaEditProfile = Yup.object({
  first_name: Yup.string().firstLetterUppercase(
    "First name must start with a capital letter"
  ),
  last_name: Yup.string().firstLetterUppercase(
    "Last name must start with a capital letter"
  ),
  team: Yup.string().oneOf(
    ["FND", "BND", "QA", "DESIGN", "HR", "PR"],
    "Invalid team"
  ),
  squad: Yup.string().oneOf(["NETWATCH", "GIZMO", "NOVA"], "Invalid squad"),
  email: Yup.string().email("Invalid email address"),
  avatar_url: Yup.string(),
});

export const validationSchemaChangePassword = Yup.object({
  currentPassword: Yup.string(),
  password: Yup.string().matches(
    new RegExp(passwordPattern),
    "At least 8 character and in (e.g., Example1!) format"
  ),
  confirmPassword: Yup.string().matches(
    new RegExp(passwordPattern),
    "At least 8 character and in (e.g., Example1!) format"
  ),
});
