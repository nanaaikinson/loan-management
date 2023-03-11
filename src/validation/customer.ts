import {
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestIdTypeEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import type { InferType } from "yup";
import { mixed, number, object, string } from "yup";

export const personalInfoValidationSchema = object({
  firstName: string().required().label("First name"),
  lastName: string().required().label("Last name"),
  phoneNumber: string().required().label("Phone number"),
  gender: mixed<StoreCustomerRequestGenderEnum>()
    .oneOf(Object.values(StoreCustomerRequestGenderEnum))
    .required()
    .label("Gender"),
  dateOfBirth: string().label("Date of birth").required(),
  secondaryPhone: string().optional().label("Secondary phone"),
  email: string().optional().email().label("Email"),
  occupation: string().label("Occupation").optional(),
  gpAddress: string().label("Ghana Post Code").optional(),
  postalAddress: string().label("Postal address").optional(),
  maritalStatus: mixed<StoreCustomerRequestMaritalStatusEnum>()
    .required()
    .oneOf(Object.values(StoreCustomerRequestMaritalStatusEnum))
    .label("Marital Status"),
  sourceOfIncome: string().label("Source of income").optional(),
});

export type PersonalInfoForm = InferType<typeof personalInfoValidationSchema>;

export const identificationValidationSchema = object({
  idNumber: string().label("ID number").optional(),
  idType: mixed<StoreCustomerRequestIdTypeEnum>()
    .oneOf(Object.values(StoreCustomerRequestIdTypeEnum))
    .label("ID type")
    .optional(),
  idIssueDate: string().optional().label("ID issue date"),
  idExpiryDate: string().optional().label("ID expiry date"),
  idIssuingAuthority: string().label("ID issuing authority"),
  idIssuingCountry: string().optional().label("ID issuing country"),
  idFrontUrl: mixed().label("Front of ID").optional(),
  idFrontKey: number().label("ID front key").optional(),
  idBackUrl: string().label("Back of ID url").optional(),
  idBackKey: number().label("Back of ID key").optional(),
});

export type IdentificationInfoForm = InferType<
  typeof identificationValidationSchema
>;
