import { type InferType, object, string } from "yup";

export const loginValidationSchema = object({
  email: string().required().email().label("Email"),
  password: string().required().min(6).label("Password"),
});

export type LoginForm = InferType<typeof loginValidationSchema>;
