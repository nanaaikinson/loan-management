import {
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestIdTypeEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import type { InferType } from "yup";
import { mixed, number, object, string, lazy } from "yup";

export const personalInfoValidationSchema = object({
  firstName: string().trim().required().label("First name"),
  lastName: string().trim().required().label("Last name"),
  phoneNumber: string().trim().required().label("Phone number"),
  gender: mixed<StoreCustomerRequestGenderEnum>()
    .oneOf(Object.values(StoreCustomerRequestGenderEnum))
    .required()
    .label("Gender"),
  dateOfBirth: string().trim().label("Date of birth").required(),
  secondaryPhone: string().trim().optional().label("Secondary phone"),
  email: string().trim().optional().email().label("Email"),
  occupation: string().trim().label("Occupation").optional(),
  gpAddress: string().trim().label("Ghana Post Code").optional(),
  postalAddress: string().trim().label("Postal address").optional(),
  maritalStatus: mixed<StoreCustomerRequestMaritalStatusEnum>()
    .required()
    .oneOf(Object.values(StoreCustomerRequestMaritalStatusEnum))
    .label("Marital Status"),
  sourceOfIncome: string().trim().label("Source of income").optional(),
});

export type PersonalInfoForm = InferType<typeof personalInfoValidationSchema>;

export const identificationValidationSchema = object({
  idNumber: string().trim().label("ID number").optional(),
  idType: string()
    .trim()
    .optional()
    .oneOf([...Object.values(StoreCustomerRequestIdTypeEnum), ""])
    .label("ID type"),
  idIssueDate: string().trim().optional().label("ID issue date"),
  idExpiryDate: string().trim().optional().label("ID expiry date"),
  idIssuingAuthority: string().trim().label("ID issuing authority"),
  idIssuingCountry: string().trim().optional().label("ID issuing country"),
  idFrontUrl: string().trim().label("Front of ID").optional(),
  idFrontKey: number().label("ID front key").optional(),
  idBackUrl: string().trim().label("Back of ID").optional(),
  idBackKey: number().label("Back of ID key").optional(),
});

export type IdentificationInfoForm = InferType<
  typeof identificationValidationSchema
>;
