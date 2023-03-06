import { http } from "./axios";
import { CustomersApi } from "@/openapi/generated";

export class CustomerService extends CustomersApi {
  constructor() {
    super(undefined, "", http);
  }

  static instance = () => new CustomerService();
}
