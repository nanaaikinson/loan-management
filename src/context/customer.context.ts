import {
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestIdTypeEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import {
  IdentificationInfoForm,
  PersonalInfoForm,
} from "@/validation/customer";
import { createContext } from "react";

export interface IStoreCustomerContext {
  customer: {
    id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: StoreCustomerRequestGenderEnum;
    dateOfBirth: string;
    secondaryPhone?: string;
    email?: string;
    occupation?: string;
    gpAddress?: string;
    postalAddress?: string;
    maritalStatus: StoreCustomerRequestMaritalStatusEnum;
    sourceOfIncome?: string;
    idNumber?: string;
    idType?: StoreCustomerRequestIdTypeEnum;
    idIssueDate?: string;
    idExpiryDate?: string;
    idIssuingAuthority?: string;
    idIssuingCountry?: string;
    idFrontUrl?: string;
    idFrontKey?: number;
    idBackUrl?: string;
    idBackKey?: number;
  } | null;
  errors?: Array<string>;
  updatePersonalInfo: (data: PersonalInfoForm) => void;
  updateIdentificationInfo: (data: IdentificationInfoForm) => void;
  updateErrors: (errors: Array<string>) => void;
}

export const StoreCustomerContext = createContext<IStoreCustomerContext | null>(
  null
);
