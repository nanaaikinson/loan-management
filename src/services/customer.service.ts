import { http } from "./axios";
import { CustomersApi } from "@/openapi/generated";

export class CustomerService {
  public static instance() {
    return new CustomersApi(undefined, "", http);
  }
}
