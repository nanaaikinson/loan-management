import { type InferType, object, string } from "yup";

export const loginValidationSchema = object({
  email: string().trim().required().email().label("Email"),
  password: string().trim().required().min(6).label("Password"),
});

export type LoginForm = InferType<typeof loginValidationSchema>;
