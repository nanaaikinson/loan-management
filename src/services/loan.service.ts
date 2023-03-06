import { http } from "./axios";
import { LoansApi } from "@/openapi/generated";

export class LoanService extends LoansApi {
  constructor() {
    super(undefined, "", http);
  }

  static instance = () => new LoanService();
}
