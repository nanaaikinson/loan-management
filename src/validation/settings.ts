import { InferType, object, ref, string } from "yup";

// One uppercase, one lowercase, one number, one special character, 8 characters minimum
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const changePasswordValidationSchema = object({
  currentPassword: string().trim().required().label("Current password"),
  newPassword: string()
    .trim()
    .required()
    .matches(
      passwordRegex,
      "New password must contain at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character"
    )
    .label("New password"),
  confirmNewPassword: string()
    .trim()
    .required()
    .oneOf([ref("newPassword")], "Passwords must match")
    .label("Confirm new password"),
});
export type ChangePasswordForm = InferType<
  typeof changePasswordValidationSchema
>;
