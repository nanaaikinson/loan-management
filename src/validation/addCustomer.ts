import type { InferType } from "yup";
import { mixed, number, object, string } from "yup";
import {
  CreateCustomerRequestGenderEnum,
  CreateCustomerRequestIdTypeEnum
} from "./../api-reference/api";

export const validationSchema = object({
  firstName: string().required().label("First name"),
  lastName: string().required().label("Last name"),
  phoneNumber: string().required().label("Phone number"),
  gender: mixed<CreateCustomerRequestGenderEnum>()
    .oneOf(Object.values(CreateCustomerRequestGenderEnum))
    .required()
    .label("Gender")
    .required(),
  dateOfBirth: string().label("Date of birth").required(),

  secondaryPhone: string().optional().label("Secondary phone"),
  email: string().email().required().label("Email"),
  occupation: string().label("Occupation").optional(),
  gpAddress: string().label("Ghana Post Code").optional(),
  postalAddress: string().label("Postal address").optional(),
  idNumber: string().label("ID number").optional(),
  idType: mixed<CreateCustomerRequestIdTypeEnum>()
    .oneOf(Object.values(CreateCustomerRequestIdTypeEnum))
    .required()
    .label("ID type")
    .optional(),
  idIssueDate: string().optional().label("ID issue date").optional(),
  idExpiryDate: string().optional().label("ID expiry date").optional(),
  idIssuingAuthority: string()
    .optional()
    .label("ID issuing authority")
    .optional(),
  idIssuingCountry: string().optional().label("ID issuing country").optional(),
  idFrontUrl: mixed().label("Front of ID").optional(),
  idFrontKey: number().label("ID front key").optional(),
  idBackUrl: string().label("Back of ID url").optional(),
  idBackKey: number().label("Back of ID key").optional(),
  maritalStatus: string().label("Marital Status").optional(),
  sourceOfIncome: string().label("Source of income").optional(),
});

export type AddCustomerForm = InferType<typeof validationSchema>;
