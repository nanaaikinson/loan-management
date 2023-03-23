import { StoreTransactionRequestTypeEnum } from "@/openapi/generated";
import { object, string, number, type InferType } from "yup";

export const storeTransactionValidationSchema = object({
  // customerId: string().trim().required().label("Customer Id"),
  loan: string().trim().optional().label("Loan"),
  amount: number().typeError("Amount is required").required().label("Amount"),
  currency: string().trim().required().label("Currency"),
  type: string()
    .trim()
    .oneOf(Object.values(StoreTransactionRequestTypeEnum))
    .label("Type"),
  note: string().trim().optional().label("Note"),
});

export type StoreTransactionForm = InferType<
  typeof storeTransactionValidationSchema
>;
